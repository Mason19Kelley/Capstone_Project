import './Account.css';

import { Button, Form, Input, Typography } from 'antd';
import { Box, ThemeProvider } from '@mui/system';

function Account() {
  
    return (
      <div className='wrapper'>
        <div className='learningDashboard'>
          <ThemeProvider theme={{ palette: {primary: {main: 'white', text: 'black'}}}}>
            <Box sx={{
              width:1,
              height:320,
              borderRadius: 1,
              bgcolor: 'primary.main',
              textAlign: 'left',
            }}>
              <Typography.Title level={2} className='self-start' style={{textAlign:'left'}}>
                Account Info
              </Typography.Title>

              <Form name="name"
                style = {{ maxWidth:'100%' }}
                layout='inline'
              >
                <Form.Item style={{paddingLeft: '3%'}}>
                  <Input style={{ width: 300 }} placeholder="Name" />
                </Form.Item>
                <Form.Item style={{paddingLeft: '3%'}}>
                  <Input style={{ width: 300}} placeholder='Last Name'/>
                </Form.Item>
              </Form>
              <Form name="displayName" 
              style = {{maxWidth: '100%', paddingTop: '2%'}}
              layout= 'inline'
              >
                <Form.Item style={{paddingLeft: '3%'}}>
                  <Input style={{width: 660}} placeholder='Display Name'/>
                </Form.Item>
              </Form>
              <Form name="email"
              style = {{maxWidth: '100%', paddingTop: '2%'}}
              layout= 'inline'
              >
                <Form.Item style={{paddingLeft: '3%'}}>
                  <Input style={{width: 660}} placeholder='Email'/>
                </Form.Item>
              </Form>
              <Form name="save"
              style = {{maxWidth: '100%', paddingTop: '2%'}}
              layout= 'inline'
              >
                <Form.Item style={{paddingLeft: '37%'}}>
                  <Button type='primary' style={{backgroundColor: 'gray'}}>Save Changes</Button>
                </Form.Item>
              </Form>
            </Box>
          </ThemeProvider>

          <ThemeProvider theme={{ palette: {primary: {main: 'white', text: 'black'}}}}>
            <Box sx={{
              marginTop: '3%',
              width:1,
              height:450,
              borderRadius: 1,
              bgcolor: 'primary.main',
              textAlign: 'left',
            }}>
              <Typography.Title level={2} className='self-start' style={{textAlign:'left'}}>
                Profile Details
              </Typography.Title>

              <Form name="addr" style = {{maxWidth: '100%'}} layout='inline'>
                  < Form.Item style={{paddingLeft: '3%'}}>
                    <Input style={{width: 300}} placeholder='Country'/>
                  </Form.Item>
                  < Form.Item style={{paddingLeft: '3%'}}>
                    <Input style={{width: 300}} placeholder='City'/>
                  </Form.Item>
              </Form>
              <Form name="title" style={{maxWidth: '100%', paddingTop: '2%'}}>
                <Form.Item style={{paddingLeft: '3%'}}>
                  <Input style={{width: 660}} placeholder='Title'/>
                </Form.Item> 
              </Form>
              <Form name="website" style={{maxWidth: '100%'}}>
                <Form.Item style={{paddingLeft:'3%', paddingTop: '0.5%'}}>
                  <Input style={{width:660}} placeholder='Website'/>
                </Form.Item>
              </Form>
              <Form name='bio' style={{maxWidth: '100%'}}>
                <Form.Item style={{paddingLeft:'3%', paddingTop: '0.5%'}}>
                  <Input style={{width: 660, paddingBottom: '5%'}} placeholder='Bio'/>
                </Form.Item>
              </Form>
              <Form name="save"
              style = {{maxWidth: '100%', paddingTop: '0.5%'}}
              layout= 'inline'
              >
                <Form.Item style={{paddingLeft: '37%'}}>
                  <Button type='primary' style={{backgroundColor: 'gray'}}>Save Changes</Button>
                </Form.Item>
              </Form>
            </Box>
          </ThemeProvider>
        </div>
      </div>
    )
  }
  
  export default Account;