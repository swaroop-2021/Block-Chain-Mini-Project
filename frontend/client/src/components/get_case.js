import React,{Component} from 'react';

export class Getcase extends Component {
    state={...this.props}.state;
    
    handleChange=(e)=>{
        console.log(e.target.value);
        this.setState({caseId:e.target.value});
        // this.forceUpdate();
    }

    runExample = async () => {
      const {contract} = this.state;

      const response = await contract.methods.getCaseInfo(this.state.caseId).call();
      console.log(response);

      this.setState({ message: response});
    };
    render(){return (
        <div>
          <h1>Get Case Details</h1>
          <label htmlFor="caseId">Enter Case ID:</label>
          <input type="number" name="caseId" id="caseId"  defaultValue={this.state!==null? this.state.caseId:0} onChange={this.handleChange}/>
          <button onClick={()=>this.runExample()}>Click Here</button>

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