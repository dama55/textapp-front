import axios from 'axios';
import { useState } from 'react';

const TranslateComponent = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTranslate = async () => {
        // ユーザー入力のバリデーション
        if (!text.trim()) {
            setError("Please enter some text to translate.");
            return;
        }

        setIsLoading(true);
        setError(null); // 既存のエラーをクリア

        try {
            const params = new URLSearchParams({
                auth_key: process.env.REACT_APP_DEEPL_API_KEY,
                text: text,
                target_lang: 'JA'
            });

            const response = await axios.post('https://api-free.deepl.com/v2/translate', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setTranslatedText(response.data.translations[0].text);
        } catch (error) {
            console.error('Error translating:', error);
            if (error.response) {
                // APIからの応答エラーを処理
                setError(`Error: ${error.response.status} - ${error.response.data.message}`);
            } else {
                // ネットワークエラーやその他の問題
                setError("Error: An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate"
            />
            <button onClick={handleTranslate} disabled={isLoading || !text.trim()}>
                {isLoading ? 'Translating...' : 'Translate'}
            </button>
            {error && (
                <div>
                    <p>{error}</p>
                    <button onClick={handleTranslate} disabled={isLoading}>Retry</button>
                </div>
            )}
            <p>Translated Text: {translatedText}</p>
        </div>
    );
};

export default TranslateComponent