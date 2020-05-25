import * as React from 'react';
import styles from './AntDesignStep.module.scss';
import { IAntDesignStepProps } from './IAntDesignStepProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Steps, Button, message } from 'antd';
import 'antd/dist/antd.css';
import FistStep from "./FirstStep";

const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: <FistStep></FistStep>,
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

export interface IAntDesignStepState {
  current: number;
}

export default class AntDesignStep extends React.Component<IAntDesignStepProps, IAntDesignStepState> {

  public constructor(props: IAntDesignStepProps, state: IAntDesignStepState) {
    super(props);
    this.state = {
      current: 0
    };
  }

  private next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  private prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  public render(): React.ReactElement<IAntDesignStepProps> {
    return (
      <div className={styles.antDesignStep}>
        <div className={styles.container}>
          <div className={styles.row}>
            <Steps current={this.state.current}>
              {steps.map(item => (<Step key={item.title} title={item.title} />))}
            </Steps>
            <div className="steps-content">{steps[this.state.current].content}</div>
            <div className="steps-action">
              {this.state.current < steps.length - 1 && (<Button type="primary" onClick={() => this.next()}>Next</Button>)}
              {this.state.current === steps.length - 1 && (<Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>)}
              {this.state.current > 0 && (<Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>Previous</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
