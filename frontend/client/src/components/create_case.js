import React,{Component} from 'react';

export class Createcase extends Component {
    state={...this.props}.state;
    handleChange(e){
        console.log(e);
        this.setState({caseId:e.target.value});

    }
    createCase = async () => {
        const {contract} = this.state;
    
        const response1=await contract[0].methods.createCase().send({ from: this.state.accounts[0] });

        const response2=await contract[1].methods.createCase(Number(localStorage.getItem("user")[0]),response1.events.CaseCreated.returnValues[1]).send({ from: this.state.accounts[0] });

        this.setState({message:response2});

        // console.log(response1);
        console.log(response2.events.createCaseInfo.returnValues.message);
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