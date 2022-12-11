import React,{Component} from 'react';


export class Register extends Component {
    state={
        ...this.props.state,
        email:"",
        password:"",
        name:"",
        age:0,
        role:""
    };
    

    handleEmailInputChange=(e)=>{
        this.setState({email:e.target.value});
    }
    handlePasswordInputChange=(e)=>{
        this.setState({password:e.target.value});
    }
    handleNameInputChange=(e)=>{
        this.setState({name:e.target.value});
    }
    handleAgeInputChange=(e)=>{
        this.setState({age:e.target.value});
    }
    handleRoleInputChange=(e)=>{
        this.setState({role:e.target.value});
    }

    submitDetails=async(event)=>{
        event.preventDefault();
        console.log(this.state);
        // const response = await this.state.contract[1].methods.register(this.state.name,this.state.role,this.state.age,this.state.email,this.state.password).send({ from: this.state.accounts[0] });
        const response = await this.state.contract[1].methods.getUserDetails(1).call();
        console.log(response);
        // // Update state with the result.
        this.setState({ message: response});
    }


    render(){
        return(
            <form onSubmit={this.submitDetails}>
                <br />
                <label htmlFor="name">Name: </label>
                <input type="name" name="name" id="name" onChange={this.handleNameInputChange}/>
                <br />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" onChange={this.handleEmailInputChange}/>
                <br />
                <label htmlFor="role">Role: </label>
                <input type="role" name="role" id="role" onChange={this.handleRoleInputChange}/>
                <br />
                <label htmlFor="age">Age: </label>
                <input type="number" name="age" id="age" onChange={this.handleAgeInputChange}/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={this.handlePasswordInputChange}/>
                <br />
                <input type="submit" value="submit" id='submit' name="submit" />
                <br />
            </form>
        )
    }
}