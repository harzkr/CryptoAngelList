import React from 'react';
import { Link } from 'react-router-dom';
import ExperienceShow from './experience_show';
import ProjectShow from './project_show';
import EducationShow from './education_show';

class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            user_id: '',
            bio: '',
            role: '',
            location: '',
            about: '',
            achievements: '',
            skills: ''
        };
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    componentWillMount() {
        this.props.fetchProfile(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (this.state.id != this.props.profile.id) {
            this.setState(this.props.profile)
        }
    }

    render() {
        const { profile, experiences, projects, educations } = this.props;

        if (!profile) return null;

        return(
            <div className='profile-show-div'>
                <div className='cover-photo'></div>
                <div className='show-container'>
                    <div className='profile-header'>
                        <div>
                            <div className='profile-picture'>
                                <img src='/assets/user_icon.png'/>
                            </div>
                            <div>
                                <h1>{profile.name}</h1>
                                <p className='bio'>{this.state.bio.length ? this.state.bio : 'User has not set a bio'}</p> 
                                <div className='role-location-div'>
                                    <i className="fas fa-tag"></i>
                                    <p className='role'>{this.state.role.length ? this.state.role : 'Unknown'}</p> 
                                    <i className="fas fa-map-marker"></i>
                                    <p className='location'>{this.state.location.length ? this.state.location : 'Unknown'}</p> 
                                </div>
                            </div>
                        </div>
                        <div className='links'>
                            <button className='link' onClick={this.goBack}><i class="fas fa-reply"></i> Back</button>
                        </div>
                    </div>
                    <ExperienceShow experiences={experiences} />
                    <ProjectShow projects={projects} />
                    <EducationShow educations={educations} />
                    <div>
                        <div className='about-div-header'>
                            <h2>ABOUT</h2>
                        </div>
                        <div className='about-div'>
                            <label>WHAT I DO
                                <p>{this.state.about.length ? this.state.about : 'User has not set their about me' }</p>
                            </label>
                            <label> ACHIEVEMENTS
                                <p>{this.state.achievements.length ? this.state.achievements : 'User has not set their achievements' }</p>
                            </label>
                            <label> SKILLS
                                <p>{this.state.skills.length ? this.state.skills : 'User has not set their skills' }</p>
                            </label>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileForm;