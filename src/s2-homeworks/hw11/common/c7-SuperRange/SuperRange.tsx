import React from 'react'
import {Slider, sliderClasses, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ width:"147px", marginRight:"12px", color:"#00CC22",
                '& .MuiSlider-track': {color:"#00CC22"},
                '& .MuiSlider-rail':{color:"gray"},
                '& MuiSlider-thumb':{border:"1px", borderColor:"gold"}
        }}
            // стили для слайдера // пишет студент

            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
