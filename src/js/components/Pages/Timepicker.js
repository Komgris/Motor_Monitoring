import 'date-fns';
import React,{ useState,useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
export default function MaterialUIPickers(props) {

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T00:00:00'));

  const handleDateChange = date => {
    setSelectedDate(date);
    
    sendtime(changeFormat(date))
  };

  const changeFormat = (date)=>{
    var newFormat = new Intl.DateTimeFormat('default', {

      hour: 'numeric', 
      minute: 'numeric',
      hour12: false,
    }).format(date)
    return newFormat
  }
  useEffect(()=>{
    //sendtime(changeFormat(date))
  },[]) 

  const sendtime =(date)=>{
    props.timeback(date);
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label={props.timeFormat}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider>
    
  );
}