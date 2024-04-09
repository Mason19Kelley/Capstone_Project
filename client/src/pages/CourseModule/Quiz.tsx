import { useEffect, useState } from 'react';
import { Form, Radio, Button, message } from 'antd';
import { QuizAPI } from '../../api/QuizAPI';

const QuizComponent = (props: {quizId: string, done: (arg0: boolean) => void}) => {
  const [form] = Form.useForm();
  const [isAllAnswered, setIsAllAnswered] = useState(false);
  const [quizName, setQuizName ] = useState<string>()
  const [questions, setQuestions ] = useState<{key: string, options: {isCorrect: boolean, label: string, value: string}[], question: string}[]>([])


  useEffect(() => {
    QuizAPI.getQuiz(props.quizId).then(response => {
      setQuizName(response.Quiz_Name)
      setQuestions(JSON.parse(response.Quiz_JSON).Questions)
    }).catch(error => console.log(error))
  }, [props.quizId])

  const handleFormChange = () => {
    const areAllAnswered = questions.every((q) => form.getFieldValue(q.key) !== undefined);
    setIsAllAnswered(areAllAnswered);
  };

  const onFinish = () => {
    form.validateFields().then(() => {
      const selectedAnswers = form.getFieldsValue();
      const isAllCorrect = questions.every((q) => selectedAnswers[q.key] === q.options.find((opt) => opt.isCorrect)?.value);

      if (isAllAnswered && isAllCorrect) {
        message.success('Quiz complete! Please proceed to the next section.');
      } /*else if (!isAllAnswered) {
        message.error('Please answer all questions before submitting.');
    }*/else {
        message.error('One or more answers are incorrect. Please review your answers.');
      }
      props.done(isAllAnswered && isAllCorrect)
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
            key={q.key}
            name={q.key}
            label={q.question}
            rules={[{ required: true, message: 'Please select an answer.' }]}
          >
            <Radio.Group>
              {q.options.map((opt) => (
                <Radio key={opt.value} value={opt.value}>{opt.label}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="default" htmlType="submit" disabled={!isAllAnswered}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuizComponent;