import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'
import imagem from './remove.png';

/*
function Item (props) {
    const [produto, setProduto] = useState(props.produto)
    const [qtd, setQtd] = useState(props.qtd)
    return <div className="umItem">
        <input type="checkbox" name="riscar" id=""></input>
        <input type="text" value={produto} className="campo" id="tfProd" onChange={e => setProduto(e.target.value)}></input>
        <label for="preco"> R$ </label>
        <input id="preco" type="text" className="campo" id="tfPreco" onChange={e =>{props.somaPreco(+e.target.value)}}></input>
        <label for="qtd">   Qtd. </label>
        <input id="qtd" type="number" min="1" value={qtd} className="campo" id="tfQtd" onChange={e => setQtd(e.target.value)}></input>
        <span> Subtotal R$ </span>
    </div>
}

class Lista extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            total: 0.00
        }
    }
    
    soma = (novoValor, valorAntigo) => {
        this.setState({
            total: (this.state.total - valorAntigo) + novoValor
        })
    }

    render() {
        return (
            <div className="lista">
                <div className="divHeaderLista">{"Título da lista"}
                    <br/>
                    Adicionar item <input type="text" className="campoHeaderItem"></input> Qtd. <input type="number" min="1" className="campoHeaderQtd"></input> <button className="btnAdicionar">Adicionar</button>
                </div>
                <div className="conteudo">
                    <Item produto="Pão de batata"
                        qtd="3"
                        somaPreco={this.soma}></Item>
                    <Item produto="Sanduiche"
                        preco="5,42"
                        qtd="1"
                        somaPreco={this.soma}></Item>
                </div>
                <div>Total R$ {this.state.total}</div>
            </div>
        )
    }
}*/

class Lista extends React.Component {
    constructor(props) {
        super(props)
        this.state = { itens: [], produto: '', qtd: 1, total: 0.00};
        this.setProduto = this.setProduto.bind(this);
        this.setQtd =this.setQtd.bind(this);
        this.adicionarItem = this.adicionarItem.bind(this);
    }

    render() {
        return (
            <div className="lista">
                <div className="divHeaderLista">{"Título da lista"}
                    <br/>
                    Adicionar item <input type="text" className="campoHeaderItem" onChange={this.setProduto} value={this.state.produto}></input> Qtd. <input type="number" min="1" className="campoHeaderQtd" onChange={this.setQtd} value={this.state.qtd}></input> <button className="btnAdicionar" onClick={this.adicionarItem}>Adicionar</button>
                </div>
                <div className="conteudo">
                    <Item itens={this.state.itens} 
                          somaPreco={this.soma} 
                          modQtd={this.modificaQtd} 
                          del={this.deletaItem} 
                          modProd={this.modificaProduto}
                          risca={this.riscarItem}/>
                </div>
                <div>Total R$ {this.state.total}</div>
            

          {/*<div>
            <h3>Tarefas</h3>
            <TodoList items={this.state.items} />
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="new-todo">
                O que precisa ser feito?
              </label>
              <input
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
              />
              <button>
                Adicionar #{this.state.items.length + 1}
              </button>
            </form>
          </div>*/}

            </div>
        );//fim do return
      }//fim do render

      setProduto(e) {
        this.setState({ produto: e.target.value });
      }

      setQtd(e){
        this.setState({ qtd: e.target.value });
      }

      adicionarItem(e) {
        e.preventDefault();
        if (this.state.produto.length === 0) {
          return;
        }
        const newItem = {
          produto: this.state.produto,
          id: Date.now(),
          qtd: this.state.qtd,
          preco: 0.00,
          subTotal: 0.00,
          riscado: false
        };
        this.setState(state => ({
          itens: state.itens.concat(newItem),
          produto: '',
          qtd: 1
        }));
      }//fim do método adicionarItem()

      soma = (indice, novoValor) => {
        //alert("indice: " + indice + "; novo valor: " + novoValor);
        //var subTotalAntigo;
        this.setState({total: (this.state.total - this.state.itens[indice].subTotal) + (this.state.itens[indice].qtd * novoValor)})
        this.setState( state => {
          const itens = state.itens.map( (item, pos) => {
            if(pos === indice){
              //alert("índice: " + pos + "; novo valor: " + novoValor + "; valor antigo: " + item.preco);

              //Esse trecho exibe um warning no console
              //this.state.total = (this.state.total - item.subTotal) + (item.qtd * novoValor);
              //Abaixo está a correção do warning
              //this.setState({total: (this.state.total - item.subTotal) + (item.qtd * novoValor)})

              //subTotalAntigo = item.subTotal;

              item.subTotal = item.qtd * novoValor;
              item.preco = novoValor;
              return item;
            } else {
              return item;
            }
          });//fim da funçao map

          return{
            itens,
          };

        });//fim de setState
        //this.setState({total: (this.state.total - subTotalAntigo) + (this.state.itens[indice].qtd * novoValor)})

      }//fim da funçao soma

      modificaQtd = (indice, novoQtd) => {
        this.setState({total: (this.state.total - this.state.itens[indice].subTotal) + (this.state.itens[indice].preco * novoQtd)})
        this.setState( state => {
          const itens = state.itens.map( (item, pos) => {
            if(pos === indice){
              //A linha abaixo dispara um warning no console
              //this.state.total = (this.state.total - item.subTotal) + (item.preco * novoQtd);
              //A linha abaixo corrige as mensagens de warning
              //this.setState({total: (this.state.total - item.subTotal) + (item.preco * novoQtd)})
              item.subTotal = item.preco * novoQtd;
              item.qtd = novoQtd;
              return item;
            } else {
              return item;
            }
          });//fim de map

          return{
            itens,
          };
        });//fim do setState
      }

      deletaItem = (indice, produto, subtotal) => {
        
        if( window.confirm("Deseja deletar o item " + produto + "?") ) {
          this.setState(state => {
            const itens = state.itens.filter((item, pos) => indice !== pos);
            this.setState(state => ({
              total: this.state.total - subtotal
            }));
            return {
              itens,
            };
          });
        }
      };

      modificaProduto = (indice, novoNome) => {
        this.setState( state => {
          const itens = state.itens.map( (item, pos) => {
            if(pos === indice){
              item.produto = novoNome;
              return item;
            } else {
              return item;
            }
          });//fim de map

          return{
            itens,
          };
        });//fim do setState
      }

      riscarItem = (indice) => {
        this.setState( state => {
          const itens = state.itens.map( (item, pos) => {
            if(pos === indice){
              item.riscado = !item.riscado;
              return item;
            } else {
              return item;
            }
          });//fim de map

          return{
            itens,
          };
        });//fim do setState
      }

}//fim da classe (component) lista

function Item (props) {
    
    return <> {props.itens.map( (item, indice) => (
            //antes era umItem
            <div className="umItem" key={item.id} style={{opacity: item.riscado ? 0.5 : 1}}>
                <input type="checkbox" name="riscar" id="" onChange={e => {props.risca(indice)}}></input>
                <input type="text" defaultValue={item.produto} className="campo" id="tfProd" onChange={e => {props.modProd(indice, e.target.value)} }></input>
                <label htmlFor="preco"> R$ </label>
                <input type="text" className="campo" id="tfPreco" onChange={e =>{props.somaPreco(indice, +e.target.value)}}></input>
                <label htmlFor="qtd">   Qtd. </label>
                <input type="number" value={item.qtd} min="1" className="campo" id="tfQtd" onChange={e =>{props.modQtd(indice, +e.target.value)}}></input>
                <span> Subtotal R$ </span> {item.subTotal}
                <a href="/#" id="linkDel" onClick={e => {props.del(indice, item.produto, item.subTotal)} }>
                  <img src={imagem} alt={"Remover"} height={"20px"}/>
                </a>
           </div>
           ))}
          </>
}

ReactDOM.render(
    <Lista></Lista>,
    document.getElementById('root')
)
