
import './GridInfo.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function GridInfo({item, value, confidence}:{item:String, value:boolean|undefined, confidence:number}){

    return (
        <div className='itemInfo'
        style={{
          borderLeft: (value!=undefined && value==true) ? 'thick solid green':'thick solid red',
        }}
        >
            <div className='item'>{item}</div>
            <div className='confidence'>
                <CircularProgressbar value={Math.round(confidence)} text={`${Math.round(confidence)}`}
                background={true} backgroundPadding={6}
                styles={{
                  path: {
                    stroke: `white`,
                    strokeLinecap: 'butt',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    strokeWidth: '4',
                  },
                  trail: {
                    stroke: '#cfb845',
                    strokeLinecap: 'butt',
                  },
                  text: {
                    fill: 'white',
                    fontSize: '30px',
                    fontWeight: '600',
                  },
                  background: {
                    fill: '#cfb845',
                  },
                }}
                 />
            </div>
            
        </div>
    )
}