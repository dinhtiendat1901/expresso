import {Group, Radio} from '@mantine/core';
import {useState} from "react";
import classes from '../../../css/Label.module.css'

interface StatusRadioProp {
    setStatus: (status: number) => void;
}

export default function StatusRadio({setStatus}: StatusRadioProp) {
    const [value, setValue] = useState('');

    function handleOnChange(value) {
        setValue(value)
        if (value) {
            if (value === '1') setStatus(1);
            if (value === '0') setStatus(0);
        } else setStatus(undefined);
    }

    return (
        <Radio.Group
            value={value}
            onChange={handleOnChange}
            label="Run Status"
            withAsterisk>
            <Group mt='xs'>
                <Radio value='' label="Not Run" classNames={{
                    label: classes.radio_label
                }}/>
                <Radio value='1' label="Run Success" classNames={{
                    label: classes.radio_label
                }}/>
                <Radio value='0' label="Run Fail" classNames={{
                    label: classes.radio_label
                }}/>
            </Group>
        </Radio.Group>
    )
}