import React, {useEffect} from 'react'
import WorkMap from './WorkMap'

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
        const zoomSteps = 270
        const zoomIncrWidth = (128 - svg.viewBox.baseVal.width) / zoomSteps
        const zoomIncrHeight = (96 - svg.viewBox.baseVal.height) / zoomSteps
        let startCity = document.querySelector("#" + cities[0])
        let incrX = ( (startCity.cx.baseVal.value - 128 / 2) - svg.viewBox.baseVal.x) / zoomSteps
        let incrY = ((startCity.cy.baseVal.value - 96 / 2) - svg.viewBox.baseVal.y) / zoomSteps


        function followPath(){
            let path = document.querySelector("#flightpath")
            if(path == null) {
                return
            }
            let length = path.getTotalLength()
            path.style.strokeWidth = "1px"
            path.style.strokeDasharray = length + " " + length
            path.style.strokeDashoffset = length * (1 - getScrollPercent())
            let cx = path.getPointAtLength(length * getScrollPercent()).x
            let cy = path.getPointAtLength(length * getScrollPercent()).y
            let targetX = cx - svg.viewBox.baseVal.width / 2
            let targetY = cy - svg.viewBox.baseVal.height / 2   
            svg.viewBox.baseVal.x = targetX
            svg.viewBox.baseVal.y = targetY
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

    },[])
    
    return (
        <div className="section" style={{height: 20000}}>
            <WorkMap></WorkMap>
        </div>
    )
}

export default Work