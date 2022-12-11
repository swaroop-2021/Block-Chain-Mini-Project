import React,{Component} from 'react';

export class Insertevidence extends Component {
    state={...this.props}.state;
    handleChangeCase=(e)=>{
        console.log(e.target.value);
        this.setState({caseId:e.target.value});
    }
    handleChangeEvidence=(e)=>{
      console.log(e.target.value);
      this.setState({evidenceId:e.target.value});
    }

    convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    handleChangeEvidenceDetails=async(e)=>{
      console.log(e.target.files);
      const file = e.target.files[0];
      const base64 = await this.convertToBase64(file);
      console.log(base64);
      this.setState({memory: base64});
    }

    

    insertEvidence = async () => {
        const {contract} = this.state;
        console.log(this.state.memory);
        const response=await contract[0].methods.insertEvidence(this.state.caseId,this.state.evidenceId,this.state.memory).send({ from: this.state.accounts[0] });
        console.log(response);
        this.setState({message:response});
        this.state.contract[0].events.EvidenceCreated(function (err,results){
          if(err)
            console.log(err);
          else
            console.log(results.returnValues.message);
        })
      };

    render(){
    return (
        <div>
        <h1>Insert Evidence</h1>
        <label htmlFor="caseId">Enter Case ID:</label>
        <input type="number" name="caseId" id="caseId"  defaultValue={this.state!==null? this.state.caseId:0} onChange={this.handleChangeCase}/>
        <br />
        <label htmlFor="evidenceId">Enter Evidence ID:</label>
        <input type="number" name="evidenceId" id="evidenceId"  defaultValue={this.state!==null? this.state.evidenceId:0} onChange={this.handleChangeEvidence}/>
        <br />
        
        <label htmlFor="evidenceId">Upload Evidence:</label>
        <input type="file" name="evidence" id="evidence" accept=".jpeg, .png, .jpg" onChange={this.handleChangeEvidenceDetails}/>
        <br />
        <button onClick={()=>this.insertEvidence()}>Click Here</button>

          <br /><br /><br /><br />

           {/* {Object.keys(this.state.message).length!==0? */}
          {/* //  &&  Object.keys(this.state.message).length!==0 && Object.keys(this.state.message).length!==3? */}
          {/* (
            <div>
                <h1>Evidence Inserted</h1> 
                {/* <div>{Object.keys(this.state.contract.events.CaseCreated()).map((item, i) => (
                    <div key={i}>{item} : {Object.values(this.state.contract.events.CaseCreated())[i]}</div>
                ))}
                </div> */}
            {/* </div> */}
          {/* ) } */}
          {/* <p>No response {this.message}</p> */}
        </div>
    )
    }
}