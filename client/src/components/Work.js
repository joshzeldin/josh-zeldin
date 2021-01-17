import React, {useEffect} from 'react'
import WorkMap from './WorkMap'
import { default as worktext } from '../data/worktext.json'

const cities = ['AnnArbor', 'Newry', 'NewYork', 'HongKong', 'Lisbon', 'NewYork']

function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
}

function Work(){

    useEffect(() => {

        const svg = document.querySelector('svg')
        const textNode = document.querySelector('#worktext')
        const zoomSteps = 270
        const zoomIncrWidth = (128 - svg.viewBox.baseVal.width) / zoomSteps
        const zoomIncrHeight = (96 - svg.viewBox.baseVal.height) / zoomSteps
        let startCity = document.querySelector("#" + cities[0])
        let incrX = ( (startCity.cx.baseVal.value - 128 / 2) - svg.viewBox.baseVal.x) / zoomSteps
        let incrY = ((startCity.cy.baseVal.value - 96 / 2) - svg.viewBox.baseVal.y) / zoomSteps
        let textIndex = [];
        let textChildren = [];

        function getWorkTextIndex(scrollPct){
            return worktext.findIndex((txt) => {
                return (scrollPct >= txt.scrollPosition[0]) && (scrollPct <= txt.scrollPosition[1])
            })
        }

        function updWorkText(scrollPct){
            let txtInd = getWorkTextIndex(scrollPct)
            if(textIndex === txtInd){
                return
            } else if (txtInd >= 0){
                textIndex = txtInd
                textChildren.forEach((txt) => {
                    txt.remove()
                })
                textChildren = []
                let text = document.createElementNS("http://www.w3.org/2000/svg", "text")
                text.setAttribute("x", worktext[textIndex].x)
                text.setAttribute("y", worktext[textIndex].y)
                text.style.fill = worktext[textIndex].fill
                text.style.font = "3px sans-serif"
                worktext[textIndex].text.forEach((txt) => {
                    let tspan = document.createElementNS("http://www.w3.org/2000/svg","tspan")
                    tspan.setAttribute("x", worktext[textIndex].x)
                    tspan.setAttribute("dy", "1.2em")
                    tspan.textContent = txt
                    text.appendChild(tspan)
                })
                svg.appendChild(text)
                textChildren.push(text)
                
            }
        }


        function followPath(){
            let path = document.querySelector("#flightpath")
            if(path == null) {
                return
            }
            let length = path.getTotalLength()
            let scroll = getScrollPercent()
            path.style.strokeWidth = "1px"
            path.style.strokeDasharray = length + " " + length
            path.style.strokeDashoffset = length * (1 - scroll)
            let cx = path.getPointAtLength(length * scroll).x
            let cy = path.getPointAtLength(length * scroll).y
            let targetX = cx - svg.viewBox.baseVal.width / 2
            let targetY = cy - svg.viewBox.baseVal.height / 2   
            svg.viewBox.baseVal.x = targetX
            svg.viewBox.baseVal.y = targetY
            updWorkText(scroll)
            window.requestAnimationFrame(followPath)

        }

        function zoomStart(){
            if(svg.viewBox.baseVal.width >= 128){
                svg.viewBox.baseVal.width = svg.viewBox.baseVal.width + zoomIncrWidth
                svg.viewBox.baseVal.height = svg.viewBox.baseVal.height + zoomIncrHeight
                svg.viewBox.baseVal.x = svg.viewBox.baseVal.x + incrX
                svg.viewBox.baseVal.y = svg.viewBox.baseVal.y + incrY
                window.requestAnimationFrame(zoomStart)
            }
        }

        window.requestAnimationFrame(zoomStart)
        window.requestAnimationFrame(followPath)
        setInterval(() => {console.log(getScrollPercent())}, 1000)

    },[])
    
    return (
        <div className="section" style={{height: 20000}}>
            <WorkMap></WorkMap>
        </div>
    )
}

export default Work