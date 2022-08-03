
import './ArrayInfo.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ArrayInfo({type, confidence}:{type:String|undefined, confidence:number|undefined}){

    if(type != null && confidence != null)
        return (
            <div className='generalItemInfo'>
                <div className='generalType'>{type}</div>
                <div className='generalConfidence'>
                <CircularProgressbar
                    value={confidence}
                    text={`${Math.round(confidence)}%`}
                    styles={{
                        path: {
                        stroke: `#cfb845`,
                        strokeLinecap: 'butt',
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        },
                        trail: {
                        stroke: '#d6d6d6',
                        strokeLinecap: 'butt',
                        },
                        text: {
                        fill: '#7fc3c0',
                        fontSize: '25px',
                        },
                        background: {
                        fill: '#3e98c7',
                        },
                    }}
                    />
                </div>
                
            </div>
        )
    else return <p>'</p>;
}