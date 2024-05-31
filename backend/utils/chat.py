from openai import OpenAI

import utils.config as config


client = OpenAI(api_key=config.OPEN_AI_API_KEY)


# ChatCompletion(
# id='chatcmpl-9UmNpn6u3KKXf8jHXWJ8wFXFNJPuF', 
# choices=[Choice(finish_reason='stop', index=0, logprobs=None, message=ChatCompletionMessage(content='Hi! How can I assist you today?', role='assistant', function_call=None, tool_calls=None))], 
# created=1717122853, 
# model='gpt-3.5-turbo-0125', 
# object='chat.completion', 
# system_fingerprint=None, 
# usage=CompletionUsage(completion_tokens=9, prompt_tokens=10, total_tokens=19))


def chat_with_gpt(user_prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user", 
                "content": user_prompt
            }
        ]
    )
    return response
    r = response.choices[0].message.content
    return r




if __name__ == '__main__':
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['quit', 'exit', 'bye']:
            break

        resp = chat_with_gpt(user_prompt=user_input)
        print(f'Bot: {resp}')