import { useEffect, useState } from 'react';
import { Form, Radio, Button, message } from 'antd';
import { QuizAPI } from '../../api/QuizAPI';

const QuizComponent = (props: {quizId: string, done: (arg0: boolean) => void}) => {
  const [form] = Form.useForm();
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizName, setQuizName ] = useState<string>()
  const [ answers, setAnswers ] = useState<{key: string, isCorrect: boolean, label: string, value: string}[]>([])


  useEffect(() => {
    QuizAPI.getQuiz(props.quizId).then(response => {
       setQuizName(response.Quiz_Name);
       const answerChoices = JSON.parse(response.Quiz_JSON).Questions[0];
       const allAnswers = [...answerChoices.Answers.Correct, ...answerChoices.Answers.Incorrect];
   
       const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
   
       setAnswers(shuffledAnswers.map(answer => ({
         key: answer,
         value: answer,
         label: answer,
         isCorrect: answerChoices.Answers.Correct.includes(answer)
       })));
    }).catch(error => console.log(error));
   }, [props.quizId]);

  const handleFormChange = () => {
    const selectedAnswer = form.getFieldValue("question");
    const isCorrect = answers.some(answer => answer.value === selectedAnswer && answer.isCorrect);
    setIsCorrect(isCorrect);
   };

  const onFinish = () => {
    form.validateFields().then(() => {

      if (isCorrect) {
        message.success('Quiz complete! Please proceed to the next section.');
      }
        else {
        message.error('Your answer is incorrect. Please review your answer.');
      }
      props.done(isCorrect)
    });
  };

  return (
    <div className='flex flex-col justify-start'>
      <h3 className=''>{quizName}</h3>
      <Form
        form={form}
        name="quiz"
        onValuesChange={handleFormChange}
        onFinish={onFinish}
      >
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: 'Please select an answer.' }]}
        >
          <Radio.Group>
            {answers.map((option) => (
              <Radio key={option.key} value={option.value}>{option.label}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuizComponent;