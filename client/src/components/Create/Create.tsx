
import './Create.css'
import { Input, Divider, Button, Flex } from 'antd';
//import { Divider } from 'antd';

function Create() {
  
  return (
    <div className='wrapper'>
      <h1 className='self-start'>Create an Organization</h1>
      <div className='input'>
        <Divider orientation="left" plain>Administrator Name</Divider>
        <Input placeholder="Administrator Name" />
        <Divider orientation="left" plain>Administrator Email</Divider>
        <Input placeholder="Administrator Email" />
        <Divider orientation="left" plain>Password</Divider>
        <Input placeholder="Password" />
        <Divider orientation="left" plain>Organization Name</Divider>
        <Input placeholder="Organization Name" />
        <Flex gap="small" wrap="wrap">
          <Button ghost>Create</Button>
        </Flex>
      </div>
    </div>
  )
}

export default Create;
