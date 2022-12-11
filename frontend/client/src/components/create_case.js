import React,{Component} from 'react';

export class Createcase extends Component {
    state={...this.props}.state;
    handleChange(e){
        console.log(e);
        this.setState({caseId:e.target.value});

    }
    createCase = async () => {
        const {contract} = this.state;
    
        const response=await contract[0].methods.createCase().send({ from: this.state.accounts[0] });
        this.setState({message:response});
        console.log(response);
        console.log(response.events.CaseCreated.returnValues.message);
        // this.state.contract.events.CaseCreated(function (err,results){
        //   if(err)
        //     console.log(err);
        //   else
        //     console.log(results.returnValues.message);
        // })
      };
    render(){
    return (
        <div>
        <h1>Create Case</h1>
          <button onClick={()=>this.createCase()}>Click Here</button>

          <br /><br /><br /><br />
        
          {/* {Object.keys(state.message).map(([key,value]) => {
                return(
                  <div key={value}>
                    <h2>
                      {key}:{value}
                    </h2>
                  </div>
                )
          })} */}
          {Object.keys(this.state.message).length!==0 && Object.keys(this.state.message).length!==3?
          (
            <div>
                <h1>Case Created</h1> 
                {/* <div>{Object.keys(this.state.contract.events.CaseCreated()).map((item, i) => (
                    <div key={i}>{item} : {Object.values(this.state.contract.events.CaseCreated())[i]}</div>
                ))}
                </div> */}
            </div>
          ):
          (
            <p>
              
            </p>
          )} 
        </div>
    )
    }
}