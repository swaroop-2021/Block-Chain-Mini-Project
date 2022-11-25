import React,{Component} from 'react';

export class Getevidence extends Component {
    state={...this.props}.state;
    
    handleChangeCase=(e)=>{
        console.log(e.target.value);
        this.setState({caseId:e.target.value});
        // this.forceUpdate();
    }
    handleChangeEvidence=(e)=>{
        console.log(e.target.value);
        this.setState({evidenceId:e.target.value});
        // this.forceUpdate();
    }

    getEvidence = async () => {
      const {contract} = this.state;

      const response = await contract.methods.getEvidenceInfo(this.state.caseId,this.state.evidenceId).call();
      console.log(response);

      this.setState({ message: response});
    };
    render(){return (
        <div>
          <h1>Get Evidence Details</h1>
          <label htmlFor="caseId">Enter Case ID:</label>
          <input type="number" name="caseId" id="caseId"  defaultValue={this.state!==null? this.state.caseId:0} onChange={this.handleChangeCase}/>

          <label htmlFor="evidenceId">Enter Case ID:</label>
          <input type="number" name="evidenceId" id="evidenceId"  defaultValue={this.state!==null? this.state.evidenceId:0} onChange={this.handleChangeEvidence}/>
          <button onClick={()=>this.getEvidence()}>Click Here</button>

          <br /><br /><br /><br />

          {this.state!==null && this.state.message!==null?
          (
            <div>The stored value is: <p>{this.state.message[0]}</p>
            <p>{this.state.message[1]}</p>
            <p>{this.state.message[2]}</p></div>
          ):
          (<p>No response</p>)}

        </div>
    )
  }
}