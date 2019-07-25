import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";



class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    componentDidMount() {
    axios.get("/users")// since we set up a globalaxios default, we don't need to do "http://localhost:5000/users"
         .then((res)=>{
             if (res.data.length>0){
                 this.setState({users:res.data.map((data)=>{return data.user}),
                             user:res.data[0]})
             }
         })
    }

    onChangeUser(e) {
        this.setState({
            user: e.target.value,
        })

    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        })
  
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value,
        })

    }

    onChangeDate(date) {
        this.setState({
            date: date,
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            user: this.state.user,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        axios.post("/exercises/add",exercise)
             .then((res)=>console.log(res.data))
             .catch((err)=>console.log(err))
             .finally(()=>{
        window.location = "/";                                   
             })

    }

    render() {
        return (
            <div>
                <h2 className="display-4 text-info">Create An Exercise Log</h2>
                <br />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row justify-content-center ">
                        <label htmlFor="user" className="col-md-2">UserName:</label>
                        <select className="form-control col-md-6" id="user" value={this.state.user} onChange={this.onChangeUser} ref="user" required>
                            {this.state.users.map((user) => {
                                return (
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group row justify-content-center ">
                        <label htmlFor="description" className="col-md-2">Description:</label>
                        <input className="form-control col-md-6" type="text" id="description" value={this.state.description} onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group row justify-content-center ">
                        <label htmlFor="duration"  className="col-md-2">Duration (in Mins):</label>
                        <input className="form-control col-md-6 " type="number" id="duration" value={this.state.duration} onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group row justify-content-center " style={{padding:"15px"}}>
                        <label  className="col-md-6 "  style={{textAlign:"left"}}>Date :</label>
                        <div><DatePicker classNmae="col-md-6 " selected={this.state.date} onChange={this.onChangeDate}  /></div>
                    </div>
                    <br/>
                    <div className="form-group row justify-content-center">
                        <input type="submit" className="col-md-4  btn btn-info" value="Create Exercise Log" />
                    </div>
                </form >
            </div >
        )
    }
}

export default CreateExercise