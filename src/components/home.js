//edit execute krkr dekhna
import React, { Component } from 'react';
import Calendar from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';
import './home.css';
class Home extends Component
{
    constructor()
    {
        super();
        this.state = {
            date: new Date(),
            sdate: "",
            data:"",
            edate:"",
            etitle:"",
            edesc:"",
            displayData:[],
            e1date:"",
            e1title:"",
            e1desc:""
          }
    }
    componentDidMount()
    {
        this.showNotice(this.state.sdate)
    }
    onChange = date => {this.setState({ date })
    this.setState({sdate:date.toLocaleDateString().toString()})
    this.showNotice(date.toLocaleDateString().toString())
    }
    addcalender=(date,title,desc)=>{
        const event={
            title:title,
            desc:desc
        }

        var arr=[];
        if(localStorage.getItem(date))
        {          
            var x=JSON.parse(localStorage.getItem(date));
            x.push(event)
            localStorage.setItem(date,"");
            localStorage.setItem(date, JSON.stringify(x));
        }
        else
        {
            arr.push(event);
            localStorage.setItem(date, JSON.stringify(arr));
        }     
        document.getElementById('title').value="";
        document.getElementById('desc').value="";
        alert("Notice Added")
        this.showNotice(date);
    }
    showNotice=(date)=>
    {
        this.setState({displayData:JSON.parse(localStorage.getItem(date))});
    }
    dataa=(desc)=>
    {
        this.setState({data:desc})
    }
    edit=(date,title,desc)=>{
         this.setState({edate:date,etitle:title,edesc:desc})
        console.log(title)
    }
    finaledit=(date,title,desc)=>{
        const x=JSON.parse(localStorage.getItem(this.state.sdate))
        x.map((i,key)=>{
            if(i.title==this.state.etitle&&i.desc==this.state.edesc)
            {
             if(title!=""&&desc!="")
             {
             i.title=title;
             i.desc=desc;   
             }
             else if(title!=""&&desc=="")
             {
                 i.title=title;
                 i.desc=this.state.edesc;
             }
             else if(title==""&&desc!="")
             {
                 i.title=this.state.etitle;
                 i.desc=desc;
             }
             else
             {
                i.title=this.state.etitle;
                i.desc=this.state.edesc;
             }
            }
            if(date!=this.state.sdate&&i.title==this.state.etitle&&i.desc==this.state.edesc&&date!="")
            {
                console.log("***")
                if(localStorage.getItem(date))
                    {          
                        var x1=JSON.parse(localStorage.getItem(date));
                        x1.push(i)
                        localStorage.setItem(date,"");
                        localStorage.setItem(date, JSON.stringify(x1));
                    }
                    else
                    {
                        var ar=[];
                        ar.push(i);
                        localStorage.setItem(date, JSON.stringify(ar));
                    }
                x.splice(key, 1);
                localStorage.setItem(this.state.sdate,JSON.stringify(x));
            }
        })

        if(date=="")
        {
        console.log("yes")
        localStorage.setItem(this.state.sdate,JSON.stringify(x));
        }
        console.log(x)
        alert("Notice Edited")
        this.showNotice(this.state.sdate);
    }
    delete=(date,title,desc)=>{
        const x=JSON.parse(localStorage.getItem(date))
        x.map((i,key)=>{
            if(i.title==this.state.etitle&&i.desc==this.state.edesc)
            {
                x.splice(key, 1); 
            }
        })
        localStorage.setItem(date,JSON.stringify(x));
        this.showNotice(date);
    }
    clear=()=>
    {
        document.getElementById("etitle").value="";
        document.getElementById("edesc").value="";
    }
    aclear=()=>
    {
        document.getElementById("title").value="";
        document.getElementById("desc").value="";
    }
    change=(ev)=>{
        console.log(ev)
    }
    render()
    {
        return (
            <div>
                <div class="sidebar">
                <center><h1 style={{fontFamily: "Alex Brush",fontSize: "60px",color:"rgb(48 140 175)",fontWeight:"800"}}>Notes World</h1></center>
                <br/><br/><br/>
                <center><h3 id="about">Add Notes</h3>
                <h3 id="abouth" style={{marginTop:"-3vw"}}>Add Notes</h3></center>
                <br/>
                <center><Calendar onChange={this.onChange} value={this.state.date}/></center>
            </div>

            <div class="content">
            <div className="row">
                <div className="col-12" >
                <h2><center><span style={{textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 2px darkblue"}}>{this.state.sdate}</span>
                <a class="btn btn-info btn-circle ml-1" role="button" style={{float: "right"}}  data-toggle="modal" data-target="#Modal" rel="nofollow"><i class="fa fa-plus" style={{color:"white"}}></i></a></center></h2>
                </div>
            </div>            
            {this.state.displayData?<div className="row" style={{padding:"10px"}}>{this.state.displayData.map((i)=>{return <div class="col-md-4 col-12">                
    		    <div class="card profile-card-3" style={{marginBottom:"15px"}}>
    		        <div class="background-block">
    		            <img src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="profile-sample1" class="background"/>
    		        </div>
    		        <div class="profile-thumb-block">
    		            <img src="https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Decorative-Elements-PNG/Golden_Star_PNG_Clip_Art_Image.png?m=1539302833" alt="profile-image" class="profile"/>
    		        </div>
    		        <div class="card-content">
                    <h2>{i.title}<small>{this.state.sdate}</small></h2>                    
                    <div class="icon-block"><a data-toggle="modal" data-target="#EditModal" rel="nofollow"><i class="fa fa-edit" onClick={()=>{this.edit(this.state.sdate,i.title,i.desc)}}></i></a><a data-toggle="modal" data-target="#DescModal" rel="nofollow"><i class="fa fa-eye" onClick={()=>{this.dataa(i.desc)}}></i></a></div>
                    </div>
                </div>
    		
            </div>})}        
            </div>:<div>{console.log("No")}</div>}            
            </div>
            <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
             <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">{this.state.date.toLocaleDateString().toString()}</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>
            </div>
            <div class="modal-body">
            <input type="text" className="form-control" id="title" placeholder="Title"/>
            <input type="text" className="form-control" id="desc" placeholder="Description"/>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>{this.aclear()}}>Close</button>
            <button type="button" class="btn btn-primary" onClick={()=>this.addcalender(this.state.date.toLocaleDateString().toString(),document.getElementById('title').value,document.getElementById('desc').value)}>Save changes</button>
            </div>
            </div>
            </div>
            </div>



            <div class="modal fade" id="DescModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
             <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Description</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>
            </div>
            <div class="modal-body">
            <center><h3>{this.state.data}</h3></center>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
            </div>
            </div>



            <div class="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
             <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>
            </div>
            <div class="modal-body">
                {console.log(this.state.etitle)}
            <input type="text" className="form-control" id="edate" defaultValue={this.state.sdate} placeholder={this.state.sdate} onChange={()=>{this.setState({e1date:document.getElementById('edate').value})}}/>
            <input type="text" className="form-control" id="etitle" defaultValue={this.state.etitle} placeholder={this.state.etitle} onChange={()=>{this.setState({e1title:document.getElementById('etitle').value})}}/>
            <input type="text" className="form-control" id="edesc" defaultValue={this.state.edesc} placeholder={this.state.edesc} onChange={()=>{this.setState({e1desc:document.getElementById('edesc').value})}}/>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal" onClick={()=>{this.clear()}}>Close</button>
            <button type="button" class="btn btn-secondary" onClick={()=>{this.delete(this.state.date.toLocaleDateString().toString(),document.getElementById('etitle').value,document.getElementById('edesc').value)}}>Delete</button>
            <button type="button" class="btn btn-primary" onClick={()=>this.finaledit(this.state.e1date,this.state.e1title,this.state.e1desc)}>Save changes</button>
            </div>
            </div>
            </div>
            </div>

            </div>
        )
    }
}
export default Home;