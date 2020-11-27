import React from 'react';
import styles from './index.less';
import { Input, Button, InputNumber, Radio } from 'antd';
import { random, replace } from 'lodash';
//@ts-ignore
import __mock__data from '../data.json';
const { TextArea } = Input;

const type_map = {
  single: {
    name: '单',
  },
  fill: {
    name: '填',
  },
  judgment: {
    name: '判断',
  },
};

const Op = ['A', 'B', 'C', 'D', 'E', 'F'];

export default () => {
  const [data, setData] = React.useState({});
  const [single, setSingle] = React.useState(0);
  const [fill, setFill] = React.useState(0);
  const [judgment, setJudgment] = React.useState(0);
  const [questions, setQuestions] = React.useState({});
  console.log('questions = ', questions);
  const getValue = (k: string) => {
    if (k === 'single') {
      return single;
    } else if (k === 'fill') {
      return fill;
    } else if (k === 'judgment') {
      return judgment;
    }
  };

  const onChange = (k: string, value: number) => {
    if (k === 'single') {
      setSingle(value);
    } else if (k === 'fill') {
      setFill(value);
    } else if (k === 'judgment') {
      setJudgment(value);
    }
  };

  function randomNumb(min: number, max: number, size: number) {
    let res: any[] = [];
    while (res.length < size) {
      const gen = random(min, max);
      if (res.indexOf(gen) < 0) {
        res.push(gen);
      }
    }
    return res;
  }

  const genQuestion = () => {
    let singleQuestions: any[] = [];
    let fillQuestions: any[] = [];
    let judgmentQuestions: any[] = [];
    if (single > 0) {
      const idxs = randomNumb(0, data['single'].length - 1, single);
      singleQuestions = idxs.map(k => data['single'][k]);
    }
    if (fill > 0) {
      const idxs = randomNumb(0, data['fill'].length - 1, fill);
      fillQuestions = idxs.map(k => data['fill'][k]);
    }
    if (judgment > 0) {
      const idxs = randomNumb(0, data['judgment'].length - 1, judgment);
      judgmentQuestions = idxs.map(k => data['judgment'][k]);
    }
    setQuestions({
      single: singleQuestions,
      fill: fillQuestions,
      judgment: judgmentQuestions,
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <TextArea
        // value={value}
        // onChange={this.onChange}
        onChange={e => {
          console.log('value = ', e.target.value);
          try {
            if (e.target.value) {
              const obj = JSON.parse(e.target.value);

              console.log('obj = ', obj);
              setData(obj);
            }
          } catch (error) {
            console.log('--->>>', error);
          }
        }}
        placeholder="请粘贴题库到这里"
        autoSize={{ minRows: 4, maxRows: 10 }}
      />
      <div>
        {Object.keys(data).map(k => (
          <div key={k} style={{ marginTop: 12 }}>
            <span
              style={{ width: 80, display: 'inline-block' }}
              /* @ts-ignore */
            >{`${type_map[k].name}:`}</span>
            <InputNumber
              // style={{ width: 300 }}
              min={0}
              max={data[k].length}
              placeholder={`请填写考题数量`}
              value={getValue(k)}
              onChange={(value: any) => onChange(k, value)}
            />
            <span
              style={{ marginLeft: 12 }}
              /* @ts-ignore */
            >{`题库里面一共有${data[k].length}道${type_map[k].name}`}</span>
          </div>
        ))}
        <Button
          style={{ marginTop: 12 }}
          type="primary"
          disabled={!data || Object.keys(data).length === 0}
          onClick={() => {
            genQuestion();
          }}
        >
          开始考试
        </Button>
      </div>
      {/* @ts-ignore */}
      {questions?.['single']?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3>单选题</h3>
          {/* @ts-ignore */}
          {questions?.['single'].map(i => (
            <div style={{ marginTop: 12 }}>
              <div>{i.question}</div>
              <Radio.Group>
                {i.options.map((o, idx) => (
                  <Radio key={o} value={o}>{`${Op[idx]}.${o}`}</Radio>
                ))}
              </Radio.Group>
            </div>
          ))}
        </div>
      )}
      {/* @ts-ignore */}
      {questions?.['judgment']?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3>判断题</h3>
          {/* @ts-ignore */}
          {questions?.['judgment'].map(i => (
            <div style={{ marginTop: 12 }}>
              <div>{i.question}</div>
              <Radio.Group>
                <Radio value={0}>是</Radio>
                <Radio value={1}>否</Radio>
              </Radio.Group>
            </div>
          ))}
        </div>
      )}

      {/* @ts-ignore */}
      {questions?.['fill']?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3>填空题</h3>
          {/* @ts-ignore */}
          {questions?.['fill'].map(i => (
            <div style={{ marginTop: 12 }}>
              <div>{replace(i.question, '*', '_____')}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
