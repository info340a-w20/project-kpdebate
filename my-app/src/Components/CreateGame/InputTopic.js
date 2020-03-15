import React from 'react';
import GetTopicModal from './GetTopicModal.js';
import * as d3 from 'd3';
import topics from '../../data/topics.csv';
import '../../css/create-game.css'

export class InputTopic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modal: false, // has no knowledge of nested modal
            closeAll: false,
            category: "Anything", // how to send category up to input topic from gettopicmodal?
            selectedTopic: "",
            topic1: "Is Adidas better than Nike?",
            topic2: "Is cereal a soup?" // start with default topics
        }
        console.log(this.state)
    }

    componentDidMount() {
        d3.csv(topics).then((data) => {
            this.setState({
                data: data
            });
            console.log(this.state.data)
        });
    }

    showModal = () => {
        this.setState({modal: true})
    }

    closeModal = (value) => {
        let stateChanges = {
            selectedTopic: value,
            modal: false
        };
        this.setState(stateChanges);
        // bind selected topic to the topic textbox on the create-game page

    }

    generateCategories() {
        let options = [];
        let topicsVisited = [];
        for (let i = 0; i < this.state.data.length; i++) {
            let topic = this.state.data[i];
            if (!topicsVisited.includes(topic.category)) {
                topicsVisited.push(topic.category);
                options.push(<option key={i} value={topic.category}>{topic.category}</option>);
            }
        }
        return options;
    }

    // after a category is selected in GetTopicModal,
    // update state and generate 2 random topics from category
    onCategorySelection = (event, value) => {
        let selected = event.target.value
        console.log('set category to', selected);
        // after a category is selected, generate 2 random topics
        let categoryTopics = [];
        // evaluate what subcategory to "query" from
        if (selected !== "Anything") {
            for (let i = 0; i < this.state.data.length; i++) {
                let topic = this.state.data[i];
                if (topic.category === selected) {
                    categoryTopics.push(topic);
                    console.log(topic);
                }
            }
        } else {
            categoryTopics = this.state.data;
            console.log('anything data');
        }
        // randomly select 2 topics from the described category
        // let twoTopics = []
        let firstTopic = Math.floor((Math.random() * categoryTopics.length));
        let secondTopic = null;
        this.setState({"topic1": categoryTopics[firstTopic]});
        // twoTopics.push(categoryTopics[firstTopic]);
        console.log(categoryTopics)
        console.log('topic1, ' + firstTopic);
        while (secondTopic === null || secondTopic === firstTopic) { // to avoid duplicates
            secondTopic = Math.floor((Math.random() * categoryTopics.length));
        }
        this.setState({"topic2": categoryTopics[secondTopic]});
        // twoTopics.push(categoryTopics[secondTopic]);
        console.log('topic2, ' + secondTopic);
        // return twoTopics;
        this.setState({category: selected}); // update state with category selected
    }

    onInput = (input) => {
        this.setState({"selectedTopic": input})
        this.props.onInput("topic", input);
    }

    render(){
        return (
            <section id="topic" className="createGameFirst createGameContainer">
            <div className="card createGameCard">
                <div className="card-body">
                    <h4 className="card-title">Topic</h4>
                        <div className="mx-3">
                            <div className="row">
                                <form className="col-sm-8 col-md-6 mx-auto">
                                    <input id="input-topic" className="w-100" type="text" placeholder="Enter a debate topic..." value={this.state.selectedTopic} onChange={(event, value) => this.onInput(event.target.value)}/>
                                </form>
                            </div>
                        <div className="row">
                            <button id="open-modal" className="btn btn-dark mt-2 ml-auto" data-toggle="modal" data-target="#modalRandomize" onClick={()=> {this.showModal()}}>Randomize!</button>
                        </div>
                    </div>
                </div>
                <GetTopicModal show={this.state.modal} handleClose={this.closeModal.bind(this)} onCategorySelection={this.onCategorySelection} options={this.generateCategories()} topic1={this.state.topic1} topic2={this.state.topic2}/>
            </div>
            </section>
        )
    }
} 