"use client";

import { useState } from "react";

export default function useValidator(string, type) {
    const [state, setState] = useState(string);
    const [isValid, setIsValid] = useState(true);
    const [isFocussed, setIsFocussed] = useState(true);

    function check() {
        switch (type) {
            case 'EMAIL': {
                setIsValid(!!state.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/));
                break;
            }
            case 'PRICE': {
                setIsValid(state !== '' && state !== '0');
                break;
            }
            case 'PASSWORD': {
                setIsValid(state.length >= 7);
                break;
            }
            default: setIsValid(state !== '');
        }
    };

    return [state, setState, check, isValid, isFocussed, setIsFocussed];
}