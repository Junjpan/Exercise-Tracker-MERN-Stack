import React,{Component} from "react";
import axios from "axios";

class User extends Component{
    constructor(props) {
        super(props);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user: "",
        }
    }

    onChangeUser(e) {
        this.setState({
            user: e.target.value,
        })

    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            user: this.state.user,
        }
        console.log(user);
        axios.post("/users/add",user)
             .then((res)=>console.log(res.data))//return promoise
             .catch((err)=>console.log(err))
             .finally(()=>{
                 window.location="/create"
             })

        this.setState({user:""})
    }

    render(){
        return(
            <div > 
                <h2 className="display-4 text-info">Create New User</h2>
                <br />
                   <form onSubmit={this.onSubmit}>
                       <div className="form-group">
                       <label style={{textAlign:"left"}}>Username(Minimum 4 letters):</label>
                       <input type="text" className="form-control col-md-6 offset-md-3" value={this.state.user}  onChange={this.onChangeUser} required/>
                       </div>
                       <br/>
                       <div className="form-group  justify-content-center">
                       <button type="submit" className="btn btn-info">Create Username</button>    
                       </div>
                       
                    
                   </form> 
                
            </div>
        )
    }
}

export default User