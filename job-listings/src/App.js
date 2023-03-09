import './App.css';
import data from "./data.json"
import React, { useState, useEffect } from 'react';

const images = {};
const buttonsClicked = new Set();

function importAll(r) {
    r.keys().forEach((key) => (images[key] = r(key)));
}

importAll(require.context("./images", false, /\.(svg)$/));

function clicked(click) {
    if(!buttonsClicked.has(click)) {
        buttonsClicked.add(click);
    }
    filterJobs();
}

function contains(selection) {
    let lamp = false;
    selection.forEach((x) => {
        if(buttonsClicked.has(x))lamp=true;
    })
    return lamp;
}

function filterJobs(){
    let filtered_data = data ;
    if(buttonsClicked.size > 0)
        filtered_data = data.filter((entry) => buttonsClicked.has(entry.role)||buttonsClicked.has(entry.level)||contains(entry.tools)||contains(entry.languages));
    console.log(filtered_data);
    return filtered_data;
}


function App(){
    const [jobs, setJobs] = useState(data);

    return (
        <div className="App">
            <ul>
                <tbody>
                {jobs.map((val, key) => {
                    const imgpath = "./"+val.logo.split("/")[2];
                    const logo = images[imgpath];
                    return (
                        <li key={key}>
                            <img src ={logo}></img>
                            {
                                <button key = {val.role} onClick={() => {clicked(val.role); setJobs(filterJobs());}} >{val.role}</button>
                            }
                            {
                                <button key = {val.level} onClick={() => {clicked(val.level); setJobs(filterJobs());}}>{val.level}</button>
                            }
                            {val.languages.map((language) => (
                                <button key = {language} onClick={() => {clicked(language);setJobs(filterJobs());}}>{language}</button>
                            ))}
                            {val.tools.map((tool) => (
                                <button key = {tool} onClick={() => {clicked(tool);setJobs(filterJobs());}}>{tool}</button>
                            ))}

                        </li>
                    );
                })}
                </tbody>
            </ul>
        </div>
    );
}


export default App;
