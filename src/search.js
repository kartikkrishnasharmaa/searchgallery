import React from "react";
import  axios from "axios";
import Images from "./Images";
class search extends React.Component{
    state = {
        keyword :"",
        photos:[],
        loader:false
    };
    inputHandle = (e) =>{

    this.setState({ keyword:e.target.value});
    
    };
searchImages = async (e) =>{
    e.preventDefault();
    this.setState({loader:true});
    const res =await axios.get(`https://api.pexels.com/v1/search?query=${this.state.keyword}&per_page=10`,{
        headers:{
            Authorization:`563492ad6f91700001000001da9e70e0e77a4aa8b97e776182d50eae`
        }
    });
    this.setState({loader:false});
    this.setState({photos:res.data.photos});
    console.log(this.state.photos);
}

    render() {
        return (
            <>
            <h1 class="text-muted">Kartik Sharma Projects</h1>
            <h3 class="text-muted">Serach Pexels.com Images Here</h3>
            <form onSubmit={this.searchImages}>
                <div className="form-group">
                    <input 
                    type="text"
                    name="Keyword"
                    className="form-control"
                    value={this.state.keyword}
                    onChange={this.inputHandle}
                    placeholder="Search Images...."
                    />
                </div>
                <div className="form-group">
                    <input
                    type="Submit"
                    className="btn btn-success btn-block"
                    />
                </div>
            </form>
            <div className="row">
            {!this.state.loader ?(
                this.state.photos.map((img) =>
                    <Images image={img} key={img.id}/>
                )
            ):<h1>Loading... </h1>}
            </div>
            </>
        );
    }
}

export default search;