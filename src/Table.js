import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadData } from './store';

//pagination would really help this simple front end is easy but not not be helpful since we are trying to speed it up
//should there be three calls one that gets 100 items per page and keeps going one for each search of a cusip and poolname
//probably  

class TableHomeMade extends Component{
        constructor(){
          super();
          this.state = {
            searchA: '',
            searchB: '', 
          };
          this.onChange = this.onChange.bind(this);
        }
      
        componentDidMount(){
          this.props.bootstrap();
          // console.log(this.props)
       
        }
      
        onChange(ev){
          const change = {};
          console.log(change);
          change[ev.target.name] = ev.target.value;
          this.setState(change);
        }


render(){
    let { data } = this.props;
    // let cusips = [];
    // data.forEach(item=>cusips.push(item.Cusip));
    // // seems to remove the duplicates
    // cusips = [...new Set(cusips)]
    // let poolNames = [];
    // data.forEach(item=>poolNames.push(item.PoolName));
    // // seems to remove the duplicates
    // poolNames = [...new Set(poolNames)]
    // // console.log(cusips);
    // const { onChange } = this;
    // const { searchA, searchB, val } = this.state;

    // // this works but need a drop down menu at least 
    // if( searchA !== ''){
    //   data = data.filter((item)=> item.Cusip === searchA);
    // }
    // if( searchB !== ''){
    //   data = data.filter((item)=> item.PoolName.includes(searchB));
    // }

    return(
        <div className = { 'myTable' }>
          {/* It would be cool to make my own autocomplete which does not seem really hard but I don't have time right now
          it would somehow have to combine a input box with a select box, I think and filter through options as you type */}
          {/* Cusip:
          <select name='searchA' value={ searchA } onChange = { onChange }>
                    <option value = ''>-- choose a Cusip</option>
                    {
                        cusips.map( (cusip, idx) => { 
                                return (
                                    <option key={ idx } value = { cusip }>
                                        { cusip } 
                                    </option>
                                );
                            })
                    }
          </select>
          Pool Name:
          <select name='searchB' value={ searchB } onChange = { onChange }>
                    <option value = ''>-- choose a Pool Name</option>
                    {
                        poolNames.map( (poolName, idx) => { 
                                return (
                                    <option key={ idx } value = { poolName }>
                                        { poolName } 
                                    </option>
                                );
                            })
                    }
            </select>    */}
        <table >
              <thead>
                    <tr>
                        <th>Cusip</th>
                        <th>Pool Name</th>
                        <th>Type</th>
                        <th>Month</th>
                        <th>C.F.</th>
                        <th>Coupon</th>
                        <th>GWAC</th>
                        <th>WALA</th>
                        <th>WAM</th>
                    </tr>
                </thead>
            <tbody>
                  
                    {
            data.map( item => { 
                return (
                    <tr key={ item.id }> 
                        <td key={ item.id + 1} >
                            { item.group }
                        </td>
                        <td key={ item.id + 2 }>
                            { item.deal }    
                        </td>
                        <td key={ item.id + 3}>
                            { item.cpr }    
                        </td>
                        <td key={ item.id + 4}>
                            { item.cprNext }    
                        </td>
                        <td key={ item.id + 5}>
                            { item.vpr }    
                        </td>
                        <td key={ item.id + 6}>
                            { item.vprNext }    
                        </td>
                        <td key={ item.id + 7}>
                            { item.cdr }    
                        </td>
                        <td key={ item.id + 8}>
                            { item.cdrNext }    
                        </td>
                        <td key={ item.id + 9}>
                            { item.currFace }    
                        </td>
                    </tr>
                    );
                })
                
                }
            
        </tbody>
      </table>
  
          </div>
    )
  }
}

const mapStateToProps = (state) => {
    return state;
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      bootstrap: ()=> {
        dispatch(loadData());
      }
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(TableHomeMade);


