import { Info, X } from 'lucide-react';
import { BIBLE_VERSION_LABEL } from '../data/bibleBooks';

interface GovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GovernanceModal({ isOpen, onClose }: GovernanceModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="governance-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
    >
      <div className="w-full max-w-lg rounded-xl bg-[#FAF8F4] dark:bg-[#191816] border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
          <h2
            id="governance-dialog-title"
            className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400" aria-hidden="true" />
            <span>BIBLE INSIGHT 운영 및 이용 안내</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="운영 안내 닫기"
            className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs sm:text-[13px] leading-relaxed text-stone-700 dark:text-stone-300 max-h-[75vh] overflow-y-auto">
          <section className="space-y-1">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100">
              1. 판본 및 저작권 정책
            </h3>
            <p>
              본 앱은 <strong className="font-semibold">{BIBLE_VERSION_LABEL}</strong> 본문을
              외부 API(<code className="font-tabular">api.midvash.com/v1/kor</code>)에서 실시간으로
              조회하여 표시합니다. 응답의 <code className="font-tabular">data.version</code>이{' '}
              <code className="font-tabular">kor</code>가 아닌 경우 본문을 표시하지 않으며, 성경
              본문을 앱 내부에 복제·저장하거나 라이선스 확인 없이 타 판본을 추가하지 않습니다.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100">
              2. 개인정보 최소 수집 원칙
            </h3>
            <p>
              BIBLE INSIGHT는 회원가입, 로그인, 별도의 개인 데이터베이스를 사용하지 않으며 개인정보를
              수집·저장하지 않습니다.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100">
              3. AI 학습 답변 참고용 고지
            </h3>
            <p>
              AI 질문 기능은 브라우저에서 직접 API 키를 호출하지 않고, 서버{' '}
              <code className="font-tabular">/api/ask</code>를 통해 처리됩니다. 답변은 성경 본문과
              역사적 배경을 구분하고 교단·학자별 해석 차이를 공정하게 안내하도록 설계되었으나, 학습
              참고용 정보이므로 불확실한 사실은 공신력 있는 주석과 함께 확인하시기 바랍니다.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100">
              4. 무료 이용 및 비용·청구 안내
            </h3>
            <p>
              본 서비스는 무료 이용을 목표로 구성되었으나, Cloud Run 호스팅 및 Gemini API의 무료
              사용량 한도와 과금 여부는 운영 계정, 리전, 실제 트래픽·사용량에 따라 달라질 수
              있습니다. 결제 및 청구 설정은 성인 운영 주체가 직접 확인·관리해야 합니다.
            </p>
          </section>
        </div>

        <div className="px-5 py-3.5 border-t border-stone-200 dark:border-stone-800 flex justify-end bg-[#F4F0E8] dark:bg-[#161513]">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg bg-[#1E3A8A] text-white hover:bg-[#172D6E] dark:bg-blue-700 dark:hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
