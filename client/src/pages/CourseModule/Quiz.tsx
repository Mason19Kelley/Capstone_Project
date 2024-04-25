import { useEffect, useState } from 'react';
import { Form, Radio, Button, message } from 'antd';
import { QuizAPI } from '../../api/QuizAPI';

const QuizComponent = (props: {quizId: string, done: (arg0: boolean) => void}) => {
  const [form] = Form.useForm();
  const [areAllCorrect, setAreAllCorrect] = useState(false);
  const [quizName, setQuizName ] = useState<string>()
  const [ questions, setQuestions ] = useState<{ questionTitle: string, answers: {key: string, isCorrect: boolean, label: string, value: string}[]}[]>([])


  useEffect(() => {
    QuizAPI.getQuiz(props.quizId).then(response => {
      console.log(JSON.parse(response.Quiz_JSON).Questions)
       setQuizName(response.Quiz_Name);
       const allQuestions = JSON.parse(response.Quiz_JSON).Questions.map((q: { Answers: { Correct: string | any[]; Incorrect: any; }; Question: any; }) => {
          const allAnswers = [...q.Answers.Correct, ...q.Answers.Incorrect];
          const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
          return {
            questionTitle: q.Question,
            answers: shuffledAnswers.map(answer => ({
              key: answer,
              value: answer,
              label: answer,
              isCorrect: q.Answers.Correct.includes(answer)
            }))
          }
       });
       setQuestions(allQuestions);
    }).catch(error => console.log(error));
   }, [props.quizId]);

  const handleFormChange = () => {
    const correct = questions.every((q) => form.getFieldValue(q.questionTitle) === q.answers.filter(a => a.isCorrect)[0].value);
    setAreAllCorrect(correct);
   };

   

  const onFinish = () => {
    form.validateFields().then(() => {

      if (areAllCorrect) {
        message.success('Quiz complete! Please proceed to the next section.');
      }
        else {
        message.error('Your answer is incorrect. Please review your answer.');
      }
      props.done(areAllCorrect)
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
        {questions.map((q) => (
          <Form.Item
            key={q.questionTitle}
            name={q.questionTitle}
            label={q.questionTitle}
            rules={[{ required: true, message: 'Please select an answer.' }]}
          >
            <Radio.Group>
              {q.answers.map((opt, i) => (
                <Radio key={i} value={opt.value}>{opt.label}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ))}
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