import React, { Component } from 'react'
import { DateTimePicker } from 'react-widgets'

export default class TimepickerNew extends Component {

    render() {
        return (
            <div>
                      <DateTimePicker
                        value={this.state.value}
                        date={false}
                        //onChange={value => this.setState({ value })}
                        onChange={value => console.log(value)}
                    />
            </div>
        )
    }
}
