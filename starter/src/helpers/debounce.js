import { useState, useEffect } from "react"
const useDebounce = (value,delay) => {
    const [d, setValue] = useState(value)
    useEffect(() => {
        const setter = setTimeout(() => {
            setValue(value)
        },delay)
    
    return () => {
        clearTimeout(setter)
    }
},[value,delay])
return d
}
export default useDebounce
