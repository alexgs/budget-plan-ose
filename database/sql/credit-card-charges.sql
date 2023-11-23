-- SELECT * FROM transaction_accounts WHERE account_id = '58eb6de1-e589-49b2-b30b-7d649537cd45';

SELECT * FROM transaction_records tr
    JOIN public.transaction_accounts ta on tr.id = ta.transaction_record_id
    WHERE ta.account_id = '58eb6de1-e589-49b2-b30b-7d649537cd45'
      AND tr.type = 'transaction-types.payment'
;

-- UPDATE transaction_records AS tr
-- SET type = 'transaction-types.credit-card-charge'
-- FROM public.transaction_accounts AS ta
-- WHERE (ta.account_id = '58eb6de1-e589-49b2-b30b-7d649537cd45'
--   AND tr.type = 'transaction-types.payment')
-- ;

UPDATE transaction_records AS tr
SET type = 'transaction-types.credit-card-charge'
FROM public.transaction_accounts AS ta
WHERE tr.id IN (
  SELECT tr.id
  FROM transaction_records tr
    JOIN public.transaction_accounts ta on tr.id = ta.transaction_record_id
  WHERE ta.account_id = '58eb6de1-e589-49b2-b30b-7d649537cd45'
    AND tr.type = 'transaction-types.payment'
)
;
