import React from 'react';
import { Button } from 'reactstrap';

const Btn = (props) =>{
    const { children = '' } = props;
    // var disable = props.disable ? props.disable : false
    return <Button {...props.attrBtn}  >{children}</Button>;
};

export default Btn;