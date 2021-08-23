import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import GTranslate from '@material-ui/icons/GTranslate';
import Pets from '@material-ui/icons/Pets';
import MD5 from 'md5.js';
import * as bip39 from 'bip39';
import * as bs58 from 'bs58check';
import tweetnacl from 'tweetnacl';
import BWQRCode from './BWQRCode';
import BWTimer from './BWTimer';
import BWEntropyFromMnemonic from './BWEntropyFromMnemonic';
import {fromEntropy, fromMnemonic} from './BWMobile';

import Favicon from '../images/favicon.ico';
import Divider from '@material-ui/core/Divider'
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      height: '88px',
    },
    
  },

}));

export default function StateTextFields() {
    const classes = useStyles();
    const hexByteStringToByteArray=(hexByteString) => {
        var bytes = new Array(16); // this could also be a new Uint8array(16)
        for (var i = 0; i < hexByteString.length;) {
            var hexByte = hexByteString[i++] + hexByteString[i++];
            var byte = parseInt(hexByte, 16);
            bytes[i / 2 - 1] = byte;
        }
        return bytes;
    }

    const generate12words = (saltedMD5) => {
        const bits=hexByteStringToByteArray(md5Func(saltedMD5));

        // For CLI
        // const words=bip39.entropyToMnemonic(bits);
        // return words;

        // For mobile
        const words_mobile = fromEntropy(bits);
        return words_mobile.join(' ');
    }

    const md5Func = (str) => {
        const md5d=new MD5();
        md5d.update(str);
        let hex=md5d.digest('hex');
        return hex;
    }

    const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
      ];

    const [mnemonic, setMnemonic] = React.useState('');
    const [saltedMD5, setSaltedMD5] = React.useState('');
    const [walletAddress, setWalletAddress] = React.useState('');
    const [qrcodeText, setQrcodeText] = React.useState('');
    const [words12, setWords12] = React.useState('');
    
    const handleChangeMnemonic = (event) => {
        setMnemonic(event.target.value);
        let md5_1=md5Func(mnemonic);
        setSaltedMD5(md5_1);
        let md5_2=md5Func(md5_1);
        let words=generate12words(md5_2);
        setWords12(words);
        let walletAddress = showWalletAddress(words);
        setWalletAddress(walletAddress);
    };

    
    const handleChangeMD5 = (event) => {
        setSaltedMD5(event.target.value);
        let md5_2=md5Func(event.target.value);
        let words=generate12words(md5_2);
        setWords12(words);
        let walletAddress = showWalletAddress(words);
        setWalletAddress(walletAddress);
    };

    const showWalletAddress = (words) => {
        // let seed=Buffer.from(hex+hex, 'hex');
        let seed2 = BWEntropyFromMnemonic(words);
        let keyPair = tweetnacl.sign.keyPair.fromSeed(seed2);
        var array_public = Array.from(keyPair.publicKey);
        array_public=insert(array_public, 0,1);
        array_public=insert(array_public, 0,0);

        let walletAddress = bs58.encode(Buffer.from(array_public));
        setQrcodeText(walletAddress);

        return walletAddress;
    }

    const myCallback = ()=>{
        setMnemonic('');
        setSaltedMD5('');
        setWalletAddress('');
        setQrcodeText('');
        setWords12('');
    }

    return (
        <div className={classes.root} noValidate autoComplete="off" >
            <div>
                <BWTimer callback={myCallback} timeout={1200} size={80}/>
                
                <Typography variant="subtitle2" gutterBottom>
                    Auto delete and restart in...
                </Typography>
                
            </div>
            <div>
                <TextField id="field1" 
                label="Step 1. Your Secret Phrase" 
                placeholder=""
                helperText="Enter Your Own Phrase Here, WARNING: Spacing, Capitalization, and Punctuation Matter!"
                value={mnemonic} 
                onChange={handleChangeMnemonic} 
                InputLabelProps={{style: {fontSize: 22}}}         
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Favicon} style={{width:'20px', height:'20px'}}/>
                      </InputAdornment>
                    ),
                  }}
                />
            </div>
            <div>
                <TextField
                id="field2"
                label="Step 2. SALT"
                placeholder=""
                helperText="DO NOT REMOVE ANY CHARACTERS, the Position of your SALT matters. Click to place your cursor in the desired Position, type to add your SALT."
                value={saltedMD5}
                onChange={handleChangeMD5}
                InputLabelProps={{style: {fontSize: 22}}} 
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                         <img src={Favicon} style={{width:'20px', height:'20px'}}/>
                      </InputAdornment>
                    ),
                  }}
                />
            </div>
            <br/>
            <div>
                <TextField
                id="field3"
                label="Result 1 – Helium Wallet 12 Words (DO NOT SHARE)!"
                value={words12}
                InputLabelProps={{style: {fontSize: 22}}} 
                helperText="Helium Wallet 12 Words (DO NOT SHARE)!"
                />
            </div>
            <div>
                <TextField
                id="field4"
                label="Result 2. Helium Wallet Public Address, Safe to Share!"
                value={walletAddress}
                InputLabelProps={{style: {fontSize: 22}}} 
                helperText="Helium Wallet Public Address, Safe to Share!"
                />
            </div>
            <div>
                <Typography variant="subtitle2" gutterBottom>
                QR Code for your Helium Wallet Public Address, Safe to Share!
                </Typography>
                <BWQRCode text={qrcodeText}/>

                <br/>
                <Divider/>
                <Typography variant="body2" align='center' gutterBottom>
                Powered By: HNT-ICE.com | <a href='https://hnt-ice.com/terms'>Terms and Conditions</a> | This Project is Open-Source and may be downloaded here.
                </Typography>
            </div>
        </div>
    );
}