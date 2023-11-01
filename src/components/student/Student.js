import React,{Component} from 'react'


export default class Student extends Component{
    constructor(){
            super()
            this.state={
                fnm:"Jafrin"
            }
    }
    render(){
        return(
          <h3> GeorgeBrown College,Toronto</h3>
        )
    }
}