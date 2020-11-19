import React from 'react';
import { Link } from 'react-router-dom'

export default class SplashPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let url_search = window.location.search.substring(1);
        console.log(url_search)
        let code = new URLSearchParams(url_search)

        console.log(code,"checking")
        if(code.get('code')){
            window.alert("Redirecting ...")
            console.log(code.get('code'),'received code now authenticating')

            const form_data = {
                code:code.get('code')
            }
            /*fetch('/oauth_linkedin/get_access_token',{
                method:'POST',
                headers:{
                    'Content-Type':'appilcation/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify(form_data)
            })
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>{
                console.log(err)
            })*/
            $.ajax({
                url: `/oauth_linkedin/get_access_token`,
                method: 'POST',
                data: form_data,
                success:(_data)=>{
                    window.location.replace('/')
                }
            })
        }
    }

    render(){
        return (
            <div className='splash-div'>
                <div className='logo-div'>
                    <img src='/assets/hand_logo.png'/>
                    <h2>CrypoList</h2>
                </div>
                <h1>Join the world’s only crypto job board</h1>
                <h4>Experience the crypto economy — pay and get paid in crypto while working with top companies and coders.</h4>
                <div className='products-div'>
                    <div>
                        <div>
                            <h3>CyrptoList Job Hunt</h3>
                            <img src='/assets/crypto_icon.png'/>
                        </div>
                        <p>Apply to dozens of tech and startup jobs with one application. See real-time salary trends.</p>
                        <Link className='product-button' to='/jobs/index'>Find crypto jobs</Link>
                    </div>  
                    <div>
                        <div>
                            <h3>CyrptoList Recruiting</h3>
                            <img src='/assets/magnifying_glass_icon.png'/>
                        </div>
                        <p>Recruit from a pool of highly talented job-seekers. Fill short-term and long-term jobs. </p>
                        <Link className='product-button second' to='/jobs/new'>Find your next employee</Link>
                    </div>
                </div>
            </div>
        )
    }
};