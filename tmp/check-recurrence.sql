SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name IN ('medication_recommended_doses','global_medication_recommended_doses')
  AND column_name IN ('recurrence_value','recurrence_unit','administration_basis','is_single_dose')
ORDER BY table_name, column_name;
