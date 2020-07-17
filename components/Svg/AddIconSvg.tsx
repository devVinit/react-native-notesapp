import * as React from "react"
import Svg, { Path } from "react-native-svg"

const AddIconSvg = () => {
    return (
        <Svg fill="#fff" width={20} height={20} viewBox="0 0 20 20">
            <Path
                d="M19.219 9.219h-8.438V.781a.781.781 0 00-1.562 0v8.438H.781a.781.781 0 000 1.563h8.438v8.437a.781.781 0 101.563 0v-8.438h8.437a.781.781 0 100-1.562z"
                fill="#fff"
            />
        </Svg>
    )
}

export default AddIconSvg;