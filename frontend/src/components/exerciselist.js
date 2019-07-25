import React,{Component} from "react";
import {Link} from  "react-router-dom";
import axios from "axios";

const Exercise=(props)=>{
       return (
           <tr>
               <td>{props.currExercise.user}</td>
               <td>{props.currExercise.description}</td>
               <td>{props.currExercise.duration}</td>
               <td>{props.currExercise.date.substring(0,10)}</td>
               <td><Link to={`/edit/${props.currExercise._id}`}>Edit</Link> | <a href="#" onClick={props.delete}>Delete</a></td>
           </tr>
       ) 
}

class ExerciseList extends Component{
    constructor(props){
        super(props);
        this.exerciseList=this.exerciseList.bind(this)
        this.state={
            exercises:[]
        }
    }

    componentDidMount(){
        axios.get("/exercises/")
             .then((res)=>this.setState({exercises:res.data}))
             .catch((err)=>{console.log(err);
             })
    }

    deleteExercise(id){
        axios.delete("/exercises/"+id)
             .then((res)=>console.log(res.data))
             .catch((err)=>console.log(err))
             this.setState({
                exercises:this.state.exercises.filter((exercise)=>{
                    return exercise._id!==id
                }) 
            })      
    }

   


    exerciseList(){
     return   this.state.exercises.map((exercise)=>{
            return(<Exercise currExercise={exercise} delete={this.deleteExercise.bind(this,exercise._id)} key={exercise._id}></Exercise>)
        })
        
    }

    render(){
        return(
            <div>
                <h3 className="display-4 text-info">Logged Exercises</h3>
                <br/>
             <table className="table table-striped table-dark">
                 <thead >
                     <tr>
                         <th scope="col" >UserName</th>
                         <th scope="col" >Description</th>
                         <th scope="col" >Duration</th>
                         <th scope="col" >Date</th>
                         <th scope="col" >Actions</th>
                     </tr>
                 </thead>
             <tbody>
                     {this.exerciseList()}
             </tbody>
             </table>
                </div>
        )
    }
}

export default ExerciseList