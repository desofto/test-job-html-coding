document.querySelectorAll(".slider").forEach(slider => {
    let shift = 0
    let delta = 0

    let timer = null

    function shiftItems() {
        requestAnimationFrame(() => {
            let firstItem = slider.querySelector(".slider-inner .slider-item:first-child")
            let width = firstItem.clientWidth + 50
            if (shift < -width) {
                firstItem.remove()
                inner.appendChild(firstItem)
                shift += width
            }

            if (shift > 0) {
                let lastItem = slider.querySelector(".slider-inner .slider-item:last-child")
                let width = lastItem.clientWidth + 50
                lastItem.remove()
                inner.prepend(lastItem)
                shift -= width
            }

            let x = shift
            slider.querySelectorAll(".slider-inner .slider-item").forEach(item => {
                item.style.position = "absolute"
                item.style.left = x + "px"
                x += item.clientWidth + 50
            })
        })
    }

    const inner = slider.querySelector(".slider-inner")
    inner.style.position = "relative"
    inner.style.height = inner.clientHeight + "px"
    shiftItems()

    function startTimer() {
        resetTimer()
        timer = setInterval(() => {
            shift += delta
            shiftItems()
        }, 10)
    }

    function resetTimer() {
        if (timer) {
            clearInterval(timer)
            timer = null
        }
    }

    const btnBack = slider.querySelector("[role='button'][data-slide='back']")
    btnBack.addEventListener("mousedown", () => {
        delta = -5
        startTimer()
    })
    btnBack.addEventListener("mouseup", () => {
        resetTimer()
        delta = 0
    })

    const btnForward = slider.querySelector("[role='button'][data-slide='forward']")
    btnForward.addEventListener("mousedown", () => {
        delta = 5
        startTimer()
    })
    btnForward.addEventListener("mouseup", () => {
        resetTimer()
        delta = 0
    })
})