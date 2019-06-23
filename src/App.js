import React from 'react';
import './App.css';
import papercss from 'papercss/dist/paper.css'
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      newItem:"",
      total:0,
      selected:0,
      dateVar:""
    }
  }
  setStatus(i){
    let l=this.state.list;
    if(l[i].status==false)
    {
      l[i].status=true;
      this.setState({
        list:l,
        selected:this.state.selected+1,
      })  
    }else if(l[i].status==true)
    {
      l[i].status=false;
      this.setState({
        list:l,
        selected:this.state.selected-1,
      })  
    } 
  }
  getvalue(e){
    this.setState({
      newItem:e.target.value,
    })
  }
  closeit(i){
     let l=this.state.list;
    if(l[i].status==true)
    {
      l.splice(i,1);
      this.setState({
        list:l,
        total:this.state.total-1,
        selected:this.state.selected-1,
      })
    }else if(l[i].status==false)
    {
      l.splice(i,1);
      this.setState({
        list:l,
        total:this.state.total-1,
      })
    }
  }
  up(i){
    if(i==0){
      alert('Cannot swap');
      return
    }
    if(this.state.list[i-1].pin==false)
    {
      let l=this.state.list;
      let temp=l[i];
      l[i]=l[i-1];
      l[i-1]=temp;
      this.setState({
        list:l,
      })
    }
  }
  down(i){
    if(i==this.state.list.length-1){
      alert('cannot swap')
      return;
    }
    let l=this.state.list;
    let temp=l[i];
    l[i]=l[i+1];
    l[i+1]=temp;
    this.setState({
      list:l,
    })
  }
  additem(){
    let l=this.state.list;
    if(this.state.newItem=="")
    {
      alert('Enter Some text');
      return;
    }
    if(this.state.dateVar=="" || this.state.dateVar=="mm/dd/yyyy")
    {
      alert('Enter due date');
      return;
    }
    let obj={val:this.state.newItem,status:false,time:new Date().toLocaleTimeString(),date:new Date().toDateString(),dueDate:this.state.dateVar,pin:false}
    l.push(obj);
    this.setState({
      list:l,
      newItem:"",
      dateVar:"mm/dd/yyyy",
      total:this.state.total+1,
    })
  }
  byName(e){
    let opt=e.target.value;
    if(opt=="By Name"){
      console.log('hello');      
        let l=this.state.list;
        for(let i=0;i<this.state.list.length;i++){
            for(let j=i+1;j<this.state.list.length;j++){
                if(this.state.list[i].pin==false)
                  {
                  if(l[i].val>l[j].val){
                    let temp=l[i]
                    l[i]=l[j]
                    l[j]=temp;
                  }
                } 
              }
          }
    this.setState({
      list:l,
      }) 
    }
    if(opt=="By Date"){
      let l=this.state.list;
        for(let i=0;i<l.length;i++)
        {
          if(i==l.length-1)
          {
            break;
          }
          if(this.state.list[i].pin==false)
            {
              if(l[i].dueDate>l[i+1].dueDate){
                let temp=l[i];
                l[i]=l[i+1];
                l[i+1]=temp;
             }
            }          
      }
      this.setState({
        list:l,
      })
    }
    if(opt=="By Completed"){
      let i,j;
      let l=this.state.list;
      for(i=0;i<l.length;i++)
      {
        if(i==l.length-1)
          {
            break;
          }
          else if(l[i].status==false && l[i+1].status==true)
          {
          let temp=l[i];
          l[i]=l[i+1]
          l[i+1]=temp
          } 
      }
      this.setState({
        list:l,
      })
    }
  }
  getDate(e){
   this.setState({
     dateVar:e.target.value,
   })
  }
  progress(){
    if(this.state.total%2==0)
    {
      return ((this.state.selected/this.state.total)*100)
    }
    if(this.state.total%2==1)
    {
      return ((parseFloat((this.state.selected/this.state.total).toFixed(2)))*100)
    }
  }
  pinontop(i){
    let l=this.state.list;
    if(l[i].pin==false)
    {
      l[i].pin=true
      let ele=l[i];
      l.splice(i,1);
      l.unshift(ele);
      this.setState({
        list:l,
      })  
    }else if(l[i].pin==true)
    { 
      l[i].pin=false;
      let ele=l[i];
      l.splice(i,1)
      l.push(ele)
      this.setState({
        list:l,
      })
    }
  }
  render(){
    return <div>
      <div className="row inst">
        <div className="la-3 col xs-1"></div>
      <div className="la-8 col xs-10 inst">- Tap On Pin for Pinning task on Top.<br/><br/>
      - Sort the tasks by Name,Due Date and by Completed status.<br/><br/>
      - Swap the Tasks by Using the Up and Down button
      </div>
      <div className="la-1 xs-1"></div>
      </div>
      <h2>Todo List</h2>
      <div className="row bar">
      <div className="col-1"></div>
      <input className="input col-5" value={this.state.newItem} onChange={(e)=>{this.getvalue(e)}}/>
      <button className="btn-secondary col-5" onClick={()=>{this.additem()}}>Add</button><br/>
      <div className="col-1"></div>      
      </div>
      <div className="row boxes">
          <div className="col-1"></div>
          <select className="col-4 options" onClick={(e)=>{this.byName(e)}}>
          <option>Sort by</option>
          <option  value="By Name">By Name</option>
          <option  value="By Date">By Due Date</option>      
          <option  value="By Completed">By Completed</option>      
          </select>
         <div className="row col-5"><label className="text col-3">Due Date:</label><input value={this.state.dateVar} className="col-3" type="date" onChange={(e)=>{this.getDate(e)}} className="col-12"/></div>
      </div>
      <div className="row">
        <div className="col-3"></div>
      <div className="progress col-6"><div className={`bar striped primary w-${(this.progress())}`}></div></div>
      <div className="col-3"></div>
      </div>
      <h4 className="num">{this.state.selected}/{this.state.total}</h4>
        <div className="row">
        <ul className="col-12">{this.state.list.map((x,i)=>(<div className="row data"  key={i}><button onClick={(e)=>{this.setStatus(i)}} className={this.state.list[i].status?"btn-success col-5":"btn col-5"}>{x.val}<span className="time">{x.time}</span><br/><span className="time">{x.date}</span></button><button className="col-1 btn-primary" onClick={(e)=>{this.up(i)}} disabled={x.pin}>up</button><button onClick={(e)=>{this.down(i)}} disabled={x.pin} className="col-1 btn-primary">down</button><button onClick={(e)=>{this.pinontop(i)}} className="btn-warning">{x.pin?"Unpin":"Pin"}</button><button className="col-1 btn-primary btn-danger" onClick={(e)=>{this.closeit(i)}}>&times;</button><button className="col-2 btn-secondary">Due Date:<br/>{x.dueDate}</button></div>))}</ul>
      </div>  
      </div>
  }
}
export default App;
