import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class EditExercise extends Component {
    constructor(props) {
        super(props);
       // this.onChangeUser = this.onChangeUser.bind(this);
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

    //to access the path parameter values, you can use this.props.match.params.<params_variable>
    //to access the path query values, you can use this.props.location.query.<query_name>
    componentDidMount() {
    axios.get("/exercises/"+this.props.match.params.id)
         .then((res)=>{
             console.log(res.data.exercise.user)
             this.setState({
                user: res.data.exercise.user,
                description: res.data.exercise.description,
                duration: res.data.exercise.duration,
                date:new Date(res.data.exercise.date)
             })
         })   
          
    }
/** 
    onChangeUser(e) {
        this.setState({
            user: e.target.value,
        })

    }
*/
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
        axios.post("/exercises/update/"+this.props.match.params.id,exercise)
             .then((res)=>console.log(res.data))
             .catch((err)=>console.log(err))
             .finally(()=>{
        window.location = "/";                                   
             })

    }

    render() {
        return (
            <div>
                <h2 className="display-4 text-info">Edit Exercise Log</h2>
                <br />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row justify-content-center ">
                        <label htmlFor="user" className="col-md-2">UserName:</label>
                        <input className="form-control col-md-6" id="user" value={this.state.user}  readOnly/>
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
                        <input type="submit" className="col-md-4  btn btn-info" value="Update Exercise Log" />
                    </div>
                </form >
            </div >
        )
    }
}

export default EditExercise