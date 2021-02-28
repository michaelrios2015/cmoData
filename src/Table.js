import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadData } from './store';

//pagination would really help this simple front end is easy but not not be helpful since we are trying to speed it up
//should there be three calls one that gets 100 items per page and keeps going one for each search of a cusip and poolname
//probably  

class Table extends Component{
        constructor(){
          super();
          this.state = {
            searchA: 'All',
            searchB: 'All', 
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
    let groups = [];
    data.forEach(item=>groups.push(item.group));
    // data.forEach(item=>console.log(item.group));
    // seems to remove the duplicates
    groups = [...new Set(groups)]
    // console.log(groups);
    
    let dealNames = [];
    data.forEach(item=>dealNames.push(item.deal));
    // seems to remove the duplicates
    dealNames = [...new Set(dealNames)]
    // console.log(dealNames);
    
    const { onChange } = this;
    const { searchA, searchB } = this.state;

    // this works but need a drop down menu at least 
    if( searchA !== 'All'){
      data = data.filter((item)=> item.group === searchA);
    }
    if( searchB !== 'All'){
      data = data.filter((item)=> item.deal.includes(searchB));
    }

    return(
        <div className = { 'myTable' }>
          {/* It would be cool to make my own autocomplete which does not seem really hard but I don't have time right now
          it would somehow have to combine a input box with a select box, I think and filter through options as you type */}
            Groups:
            <select name='searchA' value={ searchA } onChange = { onChange }>
                    <option value = 'All'>Choose a Group</option>
                    {
                        groups.map( (group, idx) => { 
                                return (
                                    <option key={ idx } value = { group }>
                                        { group } 
                                    </option>
                                );
                            })
                    }
            </select>
            Deal Name:
            <select name='searchB' value={ searchB } onChange = { onChange }>
                        <option value = 'All'>Choose a Deal Name</option>
                        {
                            dealNames.map( (dealName, idx) => { 
                                    return (
                                        <option key={ idx } value = { dealName }>
                                            { dealName } 
                                        </option>
                                    );
                                })
                        }
                </select>   
            <table >
                <thead>
                        <tr>
                            <th>Group</th>
                            <th>Deal</th>
                            <th>CPR</th>
                            <th>CPR Next</th>
                            <th>VPR</th>
                            <th>VPR Next</th>
                            <th>CDR</th>
                            <th>CDR Next</th>
                            <th>CurrFace</th>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Table);