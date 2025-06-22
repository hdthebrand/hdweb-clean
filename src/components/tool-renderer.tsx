'use client';

import ImageCropper from '@/components/tools/image-cropper';
import TextCounter from '@/components/tools/text-counter';
import PasswordGenerator from '@/components/tools/password-generator';
import TextToSpeech from '@/components/tools/text-to-speech';
import QrCodeGenerator from '@/components/tools/qr-code-generator';
import TextVariationGenerator from '@/components/tools/text-variation-generator';
import OnlineStopwatch from '@/components/tools/online-stopwatch';
import OnlineTimer from '@/components/tools/online-timer';
import UnitConverter from '@/components/tools/unit-converter';
import ColorPicker from '@/components/tools/color-picker';
import OnlineNotepad from '@/components/tools/online-notepad';
import DateCalculator from '@/components/tools/date-calculator';
import AgeCalculator from '@/components/tools/age-calculator';
import BmiCalculator from '@/components/tools/bmi-calculator';
import TipCalculator from '@/components/tools/tip-calculator';
import LoanCalculator from '@/components/tools/loan-calculator';
import TimeZoneConverter from '@/components/tools/time-zone-converter';
import ClipboardHistory from '@/components/tools/clipboard-history';
import BinaryConverter from '@/components/tools/binary-converter';
import RomanNumeralConverter from '@/components/tools/roman-numeral-converter';
import CurrencyConverter from '@/components/tools/currency-converter';
import PdfSplitter from '@/components/tools/pdf-splitter';
import PdfMerger from '@/components/tools/pdf-merger';
import SquareMeterCalculator from '@/components/tools/square-meter-calculator';

const toolComponents: { [key: string]: React.ComponentType } = {
  'image-cropper': ImageCropper,
  'text-counter': TextCounter,
  'password-generator': PasswordGenerator,
  'text-to-speech': TextToSpeech,
  'qr-code-generator': QrCodeGenerator,
  'text-variation-generator': TextVariationGenerator,
  'online-stopwatch': OnlineStopwatch,
  'online-timer': OnlineTimer,
  'unit-converter': UnitConverter,
  'color-picker': ColorPicker,
  'online-notepad': OnlineNotepad,
  'date-calculator': DateCalculator,
  'age-calculator': AgeCalculator,
  'bmi-calculator': BmiCalculator,
  'tip-calculator': TipCalculator,
  'loan-calculator': LoanCalculator,
  'time-zone-converter': TimeZoneConverter,
  'clipboard-history': ClipboardHistory,
  'binary-converter': BinaryConverter,
  'roman-numeral-converter': RomanNumeralConverter,
  'currency-converter': CurrencyConverter,
  'pdf-splitter': PdfSplitter,
  'pdf-merger': PdfMerger,
  'square-meter-calculator': SquareMeterCalculator,
};

export default function ToolRenderer({ slug }: { slug: string }) {
  const ToolComponent = toolComponents[slug];

  if (!ToolComponent) {
    return <div>Tool not found.</div>;
  }

  return <ToolComponent />;
}
