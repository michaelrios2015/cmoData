import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadData, loadDataByDealandGroup } from './store';

// so now my filtering does new call to the database, which may or may not actually help things
//but should make it so I can use the material UI stuff easier

// still think pagination would be helpful but would need to change how we get the deals and groups to search through 
// so not going to worry about now

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

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
        // this lets me do a call with where and not end up in an infinite loop
        componentDidUpdate(_, prevState){
            
            if (prevState.searchA !== this.state.searchA || prevState.searchB !== this.state.searchB ){
                this.props.loadDataByDealandGroup(this.state.searchA, this.state.searchB);
                // console.log(this.state.searchA);
                // console.log(this.state.searchB);
            }
        }
      
        onChange(ev){
          const change = {};
        //   console.log(change);
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

    return(
        <div className = { 'myTable' }>
          {/* It would be cool to make my own autocomplete which does not seem really hard but I don't have time right now
          it would somehow have to combine a input box with a select box, I think and filter through options as you type */}
            Deal Name:
                <select name='searchA' value={ searchA } onChange = { onChange }>
                        <option value = 'All'>All Deal Names</option>
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
            Groups:
                <select name='searchB' value={ searchB } onChange = { onChange }>
                        <option value = 'All'>All Groups</option>
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
            <table >
                <thead>
                        <tr>
                            <th>Deal</th>
                            <th>Group</th>
                            <th>March CPR</th>
                            <th>April CPR</th>
                            <th>March VPR</th>
                            <th>April VPR</th>
                            <th>March CDR</th>
                            <th>April CDR</th>
                        </tr>   
                    </thead>
                <tbody>
                    {
                        data.map( item => { 
                            return (
                                <tr key={ item.id }> 
                                    <td key={ item.id + 1} >
                                        { item.deal }
                                    </td>
                                    <td key={ item.id + 2 }>
                                        { item.group }    
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
      },
      loadDataByDealandGroup: (deal, group)=> {
        dispatch(loadDataByDealandGroup(deal, group));
      }
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Table);