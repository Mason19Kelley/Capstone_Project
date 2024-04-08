import React, { useState } from 'react';
import { Form, Radio, Button, message } from 'antd';

const QuizComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [isAllAnswered, setIsAllAnswered] = useState(false);

  const questions = [
    {
      question: "What is the airspeed velocity of an Unladen Swallow?",
      options: [
        { label: "What do you mean?", value: "a", isCorrect: false },
        { label: "An African or European swallow?", value: "b", isCorrect: true },
        { label: "Huh? I-- I don't know that!", value: "c", isCorrect: false }
      ],
      key: "q1"
    },
    {
      question: "What time is it?",
      options: [
        { label: "Adventure Time!", value: "a", isCorrect: false },
        { label: "Half past ten.", value: "b", isCorrect: false },
        { label: "Time for you to get a watch!", value: "c", isCorrect: true }
      ],
      key: "q2"
    },
    {
      question: "My life be like...",
      options: [
        { label: "oooooooo", value: "a", isCorrect: false },
        { label: "aaaaaaaa", value: "b", isCorrect: false },
        { label: "ooooooooooooooooooo", value: "c", isCorrect: true }
      ],
      key: "q3"
    },
    // Add more questions here
  ];

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
    });
  };

  return (
    <div>
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