import React from 'react'
import Title from '../../../others/title'
import { FadeIn } from 'animate-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TimeAgo from 'handy-timeago'
import { profile_scroll, toggle } from '../../../../utils/utils'
import ToolTip from 'react-tooltip'
import ToTags from '../../../hashtag/toTags'
import AboutSocial from './about-social'

@connect(store => (
  { ud: store.User.user_details }
))

export default class About extends React.Component {

  state = {
    title: '',
  }

  toggleEdit = () => {
    let element = document.querySelector('.a_edit')
    toggle(element)
  }

  componentDidMount = () => profile_scroll()

  componentWillReceiveProps = ({ ud: { username, firstname, surname } }) =>
    this.setState({ title: `About @${username} (${firstname} ${surname})` })

  render() {
    let
      { ud: {
        username, firstname, surname, email, joined, bio, facebook, twitter, github, instagram, website, phone
      }} = this.props,
      { title } = this.state

    return (
      <div>

        <Title value={title} />

        <FadeIn duration='300ms' >
          <div className='senapati pro_senapati'>
            <div className='about'>

              <div className='sabout'>
                <div className='sabout_one'>
                  <img src='/images/tree.png' alt='' />
                  <div className='sabout_one_info'>
                    <span>Update or edit you profile to make it look more attractive</span>
                    <Link to='/' className='sec_btn'>Update profile</Link>
                    <Link to='/edit-profile' className='pri_btn'>Edit profile</Link>
                  </div>
                </div>

                {
                  instagram || facebook || github || twitter || website ?
                    <div className='social_div inst'>
                      {
                        instagram
                          ? <a href={instagram} target='_blank'><i className='fab fa-instagram'></i></a>
                          : null
                      }
                      {
                        facebook
                          ? <a href={facebook} target='_blank'><i className='fab fa-facebook'></i></a>
                          : null
                      }
                      {
                        github
                          ? <a href={github} target='_blank'><i className='fab fa-github'></i></a>
                          : null
                      }
                      {
                        twitter
                          ? <a href={twitter} target='_blank'><i className='fab fa-twitter'></i></a>
                          : null
                      }
                      {
                        website
                          ? <a href={website} target='_blank'><i className='fas fa-globe'></i></a>
                          : null
                      }
                    </div>
                    : null
                }
              </div>

              <div
                className='fabout'
                onMouseOver={this.toggleEdit}
                onMouseOut={this.toggleEdit}
              >
                <div className='a_edit' style={{ display: 'none' }} data-tip='Edit profile' >
                  <Link to='/edit'><i className='material-icons'>mode_edit</i></Link>
                </div>

                <div className='a_username'>
                  <span className='a_label'>Username</span>
                  <span className='a_info'>{username}</span>
                </div>

                <div className='a_name'>
                  <span className='a_label'>Name</span>
                  <span className='a_info'>{firstname} {surname}</span>
                </div>

                <div className='a_email'>
                  <span className='a_label'>Email</span>
                  <span className='a_info'>{email}</span>
                </div>

                <div className='a_bio'>
                  <span className='a_label'>Bio</span>
                  <span className='a_info'><ToTags str={`${bio}`} /></span>
                </div>

                <AboutSocial account='facebook' accountValue={facebook} />
                <AboutSocial account='instagram' accountValue={instagram} />
                <AboutSocial account='github' accountValue={github} />
                <AboutSocial account='twitter' accountValue={twitter} />
                <AboutSocial account='facebook' accountValue={facebook} />
                <AboutSocial account='website' accountValue={website} />
                <AboutSocial account='phone' accountValue={phone} />

                <div className='a_joined'>
                  <span className='a_label'>Joined</span>
                  <span className='a_info'>{ joined ? TimeAgo(joined) : null }</span>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

        <ToolTip/>

      </div>
    )
  }
}
