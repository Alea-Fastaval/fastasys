# API Endpoints & Routes Documentation

**Generated:** 2025-11-07 15:39:27
**Total Routes:** 318
**Controllers:** 26

This document provides a complete catalog of all backend API endpoints and routes in the Infosys system. Each route maps to a controller method that handles the request.

## Route Structure

Routes follow the pattern:
- **Route Name**: Internal identifier for the route
- **URL Pattern**: The URL path (`:param:` indicates dynamic segments)
- **Controller**: The controller class that handles the request
- **Method**: The specific method in the controller

## Endpoints by Controller

### Activity

**Total Endpoints:** 35

#### Aktiviteter

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `aktiviteterhome` | `aktiviteter/` | `main()` |
| `vis_alle_aktiviteter` | `aktiviteter/visalle` | `visAlle()` |
| `gamestart_details` | `aktiviteter/gamestart/:time:` | `gameStartDetails()` |
| `ajax_activity_schedules` | `aktiviteter/ajax/activity-schedules/:id:` | `ajaxActivitySchedules()` |
| `gamestart_master` | `aktiviteter/gamestart/master/:time:` | `gameStartMaster()` |
| `gamestart_minion` | `aktiviteter/gamestart/minion/:id:` | `gameStartMinion()` |
| `gamestart_minion_change` | `aktiviteter/gamestart/minion/:id:/change` | `gameStartMinionChange()` |
| `gamestart_master_change` | `aktiviteter/gamestart/master/:id:/change` | `gameStartMasterChange()` |
| `prepare_schedule_votes` | `aktiviteter/schedule-votes/prepare/:time:` | `prepareScheduleVotes()` |
| `show_vote_stats` | `aktiviteter/voting/stats-role` | `showVotesRole()` |
| `show_vote_stats_board` | `aktiviteter/voting/stats-board` | `showVotesBoard()` |
| `voting_ballots` | `aktiviteter/voting/ballots` | `votingBallots()` |

#### Aktivitet

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `visaktivitet` | `aktivitet/vis/:id:` | `visAktivitet()` |
| `edit_aktivitet` | `aktivitet/edit/:id:` | `editAktivitet()` |
| `edit_afvikling` | `aktivitet/editafvikling/:id:` | `editAfvikling()` |
| `opret_aktivitet` | `aktivitet/opret/` | `opretAktivitet()` |
| `import_activities` | `aktivitet/importer_eksporter/` | `importExportActivities()` |
| `opret_afvikling` | `aktivitet/opretafvikling/:aktivitet_id:` | `opretAfvikling()` |
| `slet_aktivitet` | `aktivitet/slet/:id:` | `sletAktivitet()` |
| `slet_afvikling` | `aktivitet/sletafvikling/:id:` | `sletAfvikling()` |
| `ajax_get_afviklinger` | `aktivitet/getafviklinger/:deltager:/:id:` | `ajaxGetAfviklinger()` |
| `ajax_get_hold` | `aktivitet/gethold/:id:` | `ajaxGetHold()` |
| `ajax_get_holdneeds` | `aktivitet/getholdneeds/:id:` | `ajaxGetHoldNeeds()` |
| `ajax_getrandomhold` | `aktivitet/getrandomhold/:id:/:type:` | `ajaxGetRandomHold()` |

#### Aktitiveter

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `activities_graphed` | `aktitiveter/graphactivity/:day:` | `gameActivity()` |
| `total_available_playtime` | `aktitiveter/getplaytime` | `getTotalPlaytime()` |

#### Vote

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `activity_vote` | `vote` | `specifyVote()` |
| `activity_vote_post` | `vote/post` | `specifyVotePosted()` |
| `cast_vote` | `vote/cast` | `castVote()` |
| `voting_done` | `vote/done` | `votingDone()` |
| `activity_specific_vote` | `vote/:code:` | `confirmVote()` |

#### Activities

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `gamestart_queue` | `activities/gamestart-queue` | `gamestartQueue()` |
| `gamestart_queue_ajax` | `activities/gamestart-queue-ajax` | `gamestartQueueAjax()` |
| `gamemaster_list_export` | `activities/gm-assignment-list` | `exportGameList()` |
| `create_gm_briefings` | `activities/create-gm-briefings` | `createGmBriefings()` |


### Admin

**Total Endpoints:** 21

#### Admin

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `admin_options` | `admin/` | `main()` |
| `admin_handle_users` | `admin/users/` | `handleUsers()` |
| `admin_handle_roles` | `admin/roles/` | `handleRoles()` |
| `admin_handle_privileges` | `admin/privileges/` | `handlePrivileges()` |
| `admin_reset_signup_confirm` | `admin/reset/confirm` | `showConfirmReset()` |
| `admin_reset_signup_execute` | `admin/reset/execute` | `resetSignups()` |
| `admin_ajax_changepass` | `admin/ajax/changepass/:id:` | `ajaxChangePass()` |
| `admin_ajax_changelabel` | `admin/ajax/changelabel/:id:` | `ajaxChangeLabel()` |
| `admin_ajax_removerole` | `admin/ajax/removerole/:id:/:role_id:` | `ajaxRemoveRole()` |
| `admin_ajax_addrole` | `admin/ajax/addrole/:id:/:role_id:` | `ajaxAddRole()` |
| `admin_ajax_disableuser` | `admin/ajax/disableuser/:id:` | `ajaxDisableUser()` |
| `admin_ajax_enableuser` | `admin/ajax/enableuser/:id:` | `ajaxEnableUser()` |
| `admin_ajax_deleteuser` | `admin/ajax/deleteuser/:id:` | `ajaxDeleteUser()` |
| `admin_ajax_createuser` | `admin/ajax/createuser/` | `ajaxCreateUser()` |
| `admin_ajax_createprivilege` | `admin/ajax/createprivilege` | `ajaxCreatePrivilege()` |
| `admin_ajax_addprivilege` | `admin/ajax/addprivilege/:role_id:/:privilege_id:` | `ajaxAddPrivilege()` |
| `admin_ajax_removeprivilege` | `admin/ajax/removeprivilege/:role_id:/:privilege_id:` | `ajaxRemovePrivilege()` |
| `admin_ajax_deleteprivilege` | `admin/ajax/deleteprivilege/:id:` | `ajaxDeletePrivilege()` |
| `admin_ajax_deleterole` | `admin/ajax/deleterole/:id:` | `ajaxDeleteRole()` |
| `admin_ajax_createrole` | `admin/ajax/createrole` | `ajaxCreateRole()` |
| `admin_ajax_users` | `admin/ajax/users/:id:` | `ajaxUsers()` |


### Api

**Total Endpoints:** 37

#### Api

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `api_auth` | `api/auth` | `auth()` |
| `api_activities_short` | `api/activities` | `activities()` |
| `api_activities` | `api/activities/:id:` | `activities()` |
| `api_activities_app` | `api/app/activities/:id:` | `activitiesForApp()` |
| `api_activities_app_v` | `api/app/v:version:/activities/:id:` | `activitiesForAppVersioned()` |
| `api_activities_app_v2` | `api/app/v2/activities/:id:` | `activitiesForAppV2()` |
| `api_activities_by_field` | `api/activities/:field:/:value:` | `activitiesByField()` |
| `api_all_activities` | `api/activities/all/:id:` | `allActivities()` |
| `api_activity_schedules` | `api/schedules/:id:` | `schedules()` |
| `api_gds` | `api/gds/:id:` | `gds()` |
| `api_gdscategories` | `api/gdscategories/:id:` | `gdsCategories()` |
| `api_gdsshift` | `api/gdsshift/:id:` | `gdsShift()` |
| `api_food` | `api/food/:id:` | `food()` |
| `api_entrance` | `api/entrance/:id:` | `entrance()` |
| `api_wear` | `api/wear/:id:` | `wear()` |
| `api_graph_wear` | `api/graph/:name:` | `fetchGraphData()` |
| `api_create_participant` | `api/participant/create` | `createParticipant()` |
| `api_set_wear` | `api/participant/addwear` | `addWear()` |
| `api_set_gds` | `api/participant/addgds` | `addGDS()` |
| `api_set_activity` | `api/participant/addactivity` | `addActivity()` |
| `api_set_entrance` | `api/participant/addentrance` | `addEntrance()` |
| `api_parse_signup` | `api/participant/signup` | `parseSignup()` |
| `api_activity_structure` | `api/activity-structure` | `activityStructure()` |
| `api_user_schedules` | `api/user/:id:` | `getUserSchedule()` |
| `api_user_schedules_v` | `api/v:version:/user/:id:` | `getUserScheduleVersioned()` |
| `api_user_schedules_v2` | `api/v2/user/:id:` | `getUserScheduleV2()` |
| `api_user_data_v` | `api/v:version:/user-data/:email:` | `getUserDataVersioned()` |
| `api_user_data` | `api/v2/user-data/:email:` | `getUserData()` |
| `api_get_messages` | `api/messages/:id:` | `getUserMessages()` |
| `api_user_register` | `api/user/:id:/register` | `registerApp()` |
| `api_user_unregister` | `api/user/:id:/unregister` | `unregisterApp()` |
| `api_user_data_v` | `api/v:version:/confirmation-data` | `getConfirmationData()` |
| `api_boardgames` | `api/v:version:/boardgames` | `getBoardgameData()` |
| `api_boardgame_loans` | `api/boardgameloans/:id:` | `getBoardgameLoans()` |
| `api_boardgame_ranking` | `api/boardgamerankings` | `boardgameRankings()` |
| `api_ribbon_login` | `api/ribbon/login` | `getRibbonUser()` |
| `api_request_password_reminder` | `api/request-password-email` | `requestPasswordReminder()` |


### Boardgames

**Total Endpoints:** 11

#### Boardgames

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `boardgames_overview` | `boardgames` | `overview()` |
| `boardgames_data` | `boardgames/data` | `fetchData()` |
| `boardgames_create` | `boardgames/create` | `createGame()` |
| `boardgames_update` | `boardgames/update` | `updateGame()` |
| `boardgames_edit` | `boardgames/edit` | `editGame()` |
| `boardgames_parse` | `boardgames/parse` | `parseSpreadsheet()` |
| `boardgames_update_note` | `boardgames/update-note` | `updateNote()` |
| `boardgames_presence_check` | `boardgames/presence-check` | `presenceCheck()` |
| `boardgames_presence_update` | `boardgames/presence-update` | `presenceUpdate()` |
| `boardgames_presence_reset` | `boardgames/presence-reset` | `resetPresence()` |
| `boardgames_reporting` | `boardgames/reporting` | `showReporting()` |


### Deltager

**Total Endpoints:** 1

#### Deltager

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `test_signup` | `deltager/testsignup/` | `test()` |


### Economy

**Total Endpoints:** 6

#### Economy

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `accounting_overview` | `economy/accounting-overview/` | `accountingOverview()` |
| `participant_overview` | `economy/participant-overview/` | `participantOverview()` |
| `register_payments` | `economy/register-payments` | `registerPayments()` |
| `confirm_payments` | `economy/confirm-payments` | `confirmPayments()` |
| `cancel_payment` | `economy/cancel-payment` | `cancelPayment()` |
| `detailed_budget` | `economy/detailedbudget/` | `detailedBudget()` |


### Entrance

**Total Endpoints:** 7

#### Indgang

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `indganghome` | `indgang/` | `main()` |
| `show_entries` | `indgang/entrytypes/` | `entryTypes()` |
| `show_entry` | `indgang/entry/:id:` | `showType()` |
| `create_entry` | `indgang/createentry/` | `createEntry()` |
| `edit_entry` | `indgang/editentry/:id:` | `editEntry()` |
| `delete_entry` | `indgang/deleteentry/:id:` | `deleteEntry()` |

#### Entry

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `entry_stats` | `entry/stats` | `entryStats()` |


### Food

**Total Endpoints:** 12

#### Mad

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `madhome` | `mad/` | `main()` |
| `show_food_types` | `mad/foodtypes/` | `showTypes()` |
| `show_food` | `mad/show/:id:` | `showFood()` |
| `edit_food` | `mad/edit/:id:` | `editFood()` |
| `create_food` | `mad/create/` | `createFood()` |
| `delete_food` | `mad/delete/:id:` | `deleteFood()` |
| `show_tradeable_food` | `mad/tradeable` | `showTradeable()` |
| `ajax_get_madtider` | `mad/ajaxgetmadtider/:id:` | `ajaxGetMadtider()` |
| `food_handout` | `mad/handout` | `displayHandout()` |
| `food_handout_ajax` | `mad/handout/ajax` | `ajaxHandout()` |

#### Food

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `food_stats` | `food/stats` | `foodStats()` |
| `reset_participant_foodtime` | `food/reset-handout-times` | `resetParticipantHandoutTimes()` |


### Gds

**Total Endpoints:** 16

#### Gds

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `gdshome` | `gds/` | `main()` |
| `gds_calendar_date` | `gds/calendar/:date:` | `viewDay()` |
| `gds_categories` | `gds/categories` | `categories()` |
| `gds_create_category` | `gds/create-category` | `createCategory()` |
| `gds_category` | `gds/category/:gds_id:` | `editCategory()` |
| `ajax_get_vagttider` | `gds/ajaxvagttider/:deltager_id:/:gds_id:` | `ajaxGetGDSTider()` |
| `ajax_get_gds_periods` | `gds/ajaxshiftperiods/:deltager_id:/:gds_id:` | `ajaxGetGDSPeriods()` |
| `ajax_get_vagtsignups` | `gds/ajaxgetsignups/:vagt_id:` | `ajaxGetSignups()` |
| `ajax_add_to_shift` | `gds/ajaxaddtoshift/:vagt_id:/:id_string:` | `ajaxAddToShift()` |
| `ajax_remove_from_shift` | `gds/ajaxremovefromshift/:vagt_id:/:id_string:` | `ajaxRemoveFromShift()` |
| `ajax_mark_no_show` | `gds/ajax-mark-noshow` | `ajaxMarkNoshow()` |
| `ajax_mark_contacted` | `gds/ajax-mark-contacted` | `ajaxMarkContacted()` |
| `list_all_shifts` | `gds/listshifts/:id:` | `listShifts()` |
| `external_list_all_shifts` | `gds/listshifts/external/:hash:` | `listShiftsExternal()` |
| `get_gds_suggestions` | `gds/shift-suggestions/:shift_id:` | `getShiftSuggestions()` |
| `gds_shift_participants` | `gds/show-shift-participants/:shift_id:` | `showShiftParticipants()` |


### Graph

**Total Endpoints:** 4

#### Graph

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `graph_participant_signups` | `graph/ajax/signups` | `ajaxSignups()` |
| `graph_participant_signups_total` | `graph/ajax/total_signups` | `ajaxTotalSignups()` |
| `graph_participant_shares` | `graph/ajax/shares` | `ajaxShares()` |
| `graph_food_shares` | `graph/ajax/foodshares` | `ajaxFoodShares()` |


### Groups

**Total Endpoints:** 9

#### Hold

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `holdhome` | `hold/` | `main()` |
| `vis_alle_hold` | `hold/visalle/` | `visAlle()` |
| `vis_hold` | `hold/vis/:id:` | `visHold()` |
| `opret_hold` | `hold/new/` | `createGroup()` |
| `edit_hold` | `hold/edit/:id:` | `edit()` |
| `delete_hold` | `hold/slet/:id:` | `deleteGroup()` |
| `ajax_delete_hold` | `hold/ajaxdeletegroup/:id:` | `ajaxDeleteGroup()` |
| `ajax_create_group` | `hold/ajaxcreategroup/:afvikling_id:` | `ajaxCreateGroup()` |

#### Groups

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `ajax_schedule_participant` | `groups/scheduleparticipant` | `ajaxScheduleParticipant()` |


### Index

**Total Endpoints:** 9

#### Root Level

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `home` | `(home)` | `main()` |

#### *

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `default` | `*` | `main()` |

#### Noaccess

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `no_access` | `noaccess` | `noAccess()` |

#### Login

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `login_page` | `login` | `login()` |

#### Logout

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `logout_page` | `logout` | `logout()` |

#### Forgotten-pass

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `forgotten_pass` | `forgotten-pass` | `forgottenPassDialog()` |

#### Forgotten-pass-submit

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `forgotten_pass_submit` | `forgotten-pass-submit` | `forgottenPassAction()` |

#### Reset-pass

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `reset_pass` | `reset-pass/:hash:` | `resetPassDialog()` |

#### Reset-pass-submit

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `reset_pass_submit` | `reset-pass-submit/:hash:` | `resetPassAction()` |


### Loans

**Total Endpoints:** 7

#### Loans

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `loans_overview` | `loans` | `overview()` |
| `loans_data` | `loans/data` | `fetchData()` |
| `loans_create` | `loans/create` | `createItem()` |
| `loans_update` | `loans/update` | `updateItem()` |
| `loans_edit` | `loans/edit` | `editItem()` |
| `loans_parse` | `loans/parse` | `parseSpreadsheet()` |
| `loans_update_note` | `loans/update-note` | `updateNote()` |


### Log

**Total Endpoints:** 2

#### Log

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `log` | `log` | `showLog()` |
| `log_ajax` | `log/ajax/` | `ajaxList()` |


### Mail

**Total Endpoints:** 3

#### Mail

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `send_setup_mail` | `mail/sendsetupmail` | `sendSetupMail()` |
| `send_evaluation_mail` | `mail/sendevaluationmail` | `sendEvaluationMail()` |
| `send_password_mail` | `mail/fixpassword` | `fixPasswords()` |


### Participant

**Total Endpoints:** 72

#### Deltager

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `all_users_ajax` | `deltager/ajax/userlist` | `ajaxlist()` |
| `ajax_user_search` | `deltager/ajaxsearch/:vagt_id:/:term:` | `ajaxUserSearch()` |
| `ajax_get_user_types` | `deltager/ajax/get_user_types` | `ajaxGetUserTypes()` |
| `delete_deltager` | `deltager/delete/:id:` | `deleteDeltager()` |
| `deltagere_karmalist` | `deltager/karmalist` | `karmaList()` |
| `deltagere_karmalistsorteret` | `deltager/karmalist/:direction:` | `karmaList()` |
| `deltagerehome` | `deltager/` | `main()` |
| `edit_deltager` | `deltager/retdeltager/:id:` | `visEdit()` |
| `edit_deltager_note` | `deltager/retdeltagernote/:textfield:/:id:` | `visTextedit()` |
| `karma_stats` | `deltager/karmastats/` | `karmaStatus()` |
| `list_schedule_signups` | `deltager/visforafvikling/:afvikling_id:/:assigned:` | `listForSchedule()` |
| `list_group_participants` | `deltager/visforhold/:hold_id:` | `listForGroup()` |
| `opret_deltager` | `deltager/opret/` | `createDeltager()` |
| `create_and_checkin` | `deltager/createcheckin/` | `createAndCheckIn()` |
| `participant_info` | `deltager/tilmeldingsinfo/:hash:` | `displayParticipantInfo()` |
| `print_list` | `deltager/printlist/` | `printList()` |
| `sms_send` | `deltager/sendsmstexts/` | `sendSMSes()` |
| `show_d_search` | `deltager/showsearch/` | `showSearch()` |
| `show_bought_food` | `deltager/boughtfood/:type:` | `showBoughtFood()` |
| `sms_dialog` | `deltager/smsdialog/` | `displaySMSDialog()` |
| `spillersedler` | `deltager/spillersedler/:id_range:` | `spillerSedler()` |
| `update_deltager` | `deltager/update/:id:` | `updateDeltager()` |
| `update_deltager_aktiviteter` | `deltager/updateaktivitet/:id:` | `updateAktiviteter()` |
| `update_deltager_aktivitets_tilmeldinger` | `deltager/updatetilmelding/:id:` | `updateTilmeldinger()` |
| `update_deltager_gds` | `deltager/updategds/:id:` | `updateGDS()` |
| `update_deltager_gdstilmeldinger` | `deltager/updategdstilmeldinger/:id:` | `updateGDSTilmeldinger()` |
| `update_deltager_madwear` | `deltager/updatemadwear/:id:` | `updateMadWear()` |
| `update_deltager_note` | `deltager/updatenote/:textfield:/:id:` | `updateDeltagerNote()` |
| `update_participant_sleeping` | `deltager/updatesleeping/:id:` | `updateParticipantSleeping()` |
| `update_participant_sleeping_post` | `deltager/persistsleepingdata/:id:` | `updateParticipantSleepingData()` |
| `vis_alle_deltagere` | `deltager/visalle` | `visAlle()` |
| `show_search_result` | `deltager/search_result` | `showSearchResult()` |
| `download_participant_sheet` | `deltager/spradsheet` | `downloadSpreadSheet()` |
| `vis_spilledere` | `deltager/visgms/` | `listGMs()` |
| `vis_fordelte_spilledere` | `deltager/visfordeltegms/:id:` | `listAssignedGMs()` |
| `visdeltager` | `deltager/visdeltager/:id:` | `visDeltager()` |
| `visprint` | `deltager/showsignup/:id:` | `showSignupDetails()` |
| `payment_interface` | `deltager/payment` | `payment()` |
| `payment_interface_ajax` | `deltager/payment/ajax` | `paymentAjax()` |
| `checkin_interface` | `deltager/checkin` | `checkin()` |
| `checkin_interface_ajax` | `deltager/checkin/ajax` | `checkinAjax()` |
| `edit_participant_types` | `deltager/types/edit` | `editTypes()` |
| `participant_editable_url` | `deltager/ajax/editable/:id:` | `doAjaxEdit()` |
| `participant_ajax_search_parameters` | `deltager/ajax/parametersearch` | `ajaxParameterSearch()` |
| `participant_remove_schedule` | `deltager/ajax/removeschedule` | `ajaxRemoveSchedule()` |
| `participant_update_schedule` | `deltager/ajax/updateschedule` | `ajaxUpdateSchedule()` |
| `participant_update_schedule_priorities` | `deltager/ajax/updateschedulepriorities` | `ajaxUpdateSchedulePriorities()` |

#### Json

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `json_showsignup` | `json/showsignup/:id:` | `showSignupDetailsJson()` |

#### Participant

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `ean8_barcode` | `participant/ean8/:participant_id:` | `ean8Barcode()` |
| `ean8_barcode_small` | `participant/ean8small/:participant_id:` | `ean8SmallBarcode()` |
| `ean8_badge` | `participant/ean8badge/:participant_id:` | `ean8Badge()` |
| `ean8_sheet` | `participant/ean8sheet/:participant_id:` | `ean8Sheet()` |
| `email_list` | `participant/email-list` | `displayEmailList()` |
| `participant_signup_email` | `participant/send-signup-email/:id:` | `sendSignupEmail()` |
| `participant_check_for_voucher` | `participant/has-vouchers/:participant_id:` | `checkForVouchers()` |
| `show_double_bookings` | `participant/check-double-bookings` | `checkForDoubleBookings()` |
| `show_refund` | `participant/show-refund` | `showRefund()` |
| `show_debitors` | `participant/show-debitors` | `showMissingPayment()` |
| `name_tag_list` | `participant/name-tag-list` | `nameTagList()` |
| `register_mobilepay_payments` | `participant/register-mobilepay` | `registerMobilepay()` |
| `confirm_mobilepay_payments` | `participant/ajax/confirm-mobilepay` | `ajaxConfirmPayment()` |
| `participant_reset_password` | `participant/reset-password/:hash:` | `resetParticipantPassword()` |
| `anonymize_participants` | `participant/anonymize` | `anonymizeParticipants()` |
| `send_welcome_mail` | `participant/sendwelcomemail` | `sendWelcomeMail()` |
| `send_review_mail` | `participant/sendreviewmail` | `sendReviewMail()` |
| `cron_payment_reminder` | `participant/payment-reminder/cron` | `cronPaymentReminder()` |
| `13-day_payment_reminder` | `participant/payment-reminder/second` | `sendSecondPaymentReminder()` |
| `final_payment_reminder` | `participant/payment-reminder/final` | `sendFinalPaymentReminder()` |
| `payment_reminder_annulled` | `participant/payment-reminder/annulled` | `cancelParticipantSignup()` |
| `participant_register_bank_payment` | `participant/register-bank-transfer/:id:` | `registerBankTransfer()` |

#### Economy

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `economy_breakdown` | `economy/breakdown` | `economyBreakdown()` |

#### Gds

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `gds_sms_team` | `gds/smsteam/:shift_id:` | `smsTeamMembers()` |


### Payment

**Total Endpoints:** 6

#### Payment

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `payment_callback` | `payment/callback` | `paymentCallBack()` |
| `payment_create_url` | `payment/createurl` | `createPaymentURL()` |
| `payment_cancel` | `payment/cancel` | `cancelPayment()` |
| `payment_status` | `payment/status` | `checkPayment()` |
| `payment_check_total` | `payment/participanttotal` | `checkTotal()` |
| `payment_create` | `payment/create` | `setupPayment()` |


### Rooms

**Total Endpoints:** 12

#### Lokaler

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `lokalerhome` | `lokaler/` | `main()` |
| `opret_lokale` | `lokaler/create` | `create()` |
| `vis_lokale` | `lokaler/vis/:id:` | `visLokale()` |
| `vis_alle_lokaler` | `lokaler/all` | `visAlle()` |
| `edit_lokale` | `lokaler/edit/:id:` | `edit()` |
| `slet_lokale` | `lokaler/slet/:id:` | `deleteRoom()` |
| `ajax_get_lokaler` | `lokaler/getlokaler/:afvikling_id:` | `ajaxGetLokaler()` |
| `lokale_brug` | `lokaler/lokalebrug/:day:` | `roomUse()` |

#### Rooms

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `image_upload` | `rooms/upload-images/:id:` | `uploadImages()` |
| `room_image_overview` | `rooms/image-overview` | `imageOverview()` |
| `sleep_statistics` | `rooms/sleepstatistics` | `sleepStatistics()` |
| `sleep_stats_json` | `rooms/sleepstatsjson` | `getSleepStatsJSON()` |


### Shop

**Total Endpoints:** 5

#### Shop

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `shop_overview` | `shop` | `overview()` |
| `shop_parse_spreadsheet_data` | `shop/parsedata` | `parseSpreadsheetData()` |
| `shop_single_update` | `shop/ajaxupdate` | `ajaxUpdate()` |
| `shop_delete_product` | `shop/deleteproduct` | `deleteProduct()` |
| `shop_product_graph_data` | `shop/product-data/:id:` | `fetchProductStats()` |


### SignupAdmin

**Total Endpoints:** 6

#### Signup

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `signup_pages` | `signup/pages` | `signupPages()` |
| `signup_pages_specific` | `signup/pages/:page:` | `signupPages()` |
| `signup_pages_add_element` | `signup/pages/add-element` | `addPageElement()` |
| `signup_pages_edit_text` | `signup/pages/edit-text` | `editText()` |
| `signup_config` | `signup/config` | `signupConfig()` |
| `signup_config_edit` | `signup/config/:module:/edit` | `editConfig()` |


### SignupApi

**Total Endpoints:** 10

#### Api

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `api_signup_config` | `api/signup/config/:module:` | `getConfig()` |
| `api_signup_configlist` | `api/signup/configlist` | `getConfigList()` |
| `api_signup_page_list` | `api/signup/pagelist` | `getPageList()` |
| `api_signup_page` | `api/signup/page/:page_id:` | `getPage()` |
| `api_signup_food` | `api/signup/food` | `getFood()` |
| `api_signup_activities` | `api/signup/activities` | `getActivities()` |
| `api_signup_wear` | `api/signup/wear` | `getWear()` |
| `api_signup_submit` | `api/signup/submit` | `submitSignup()` |
| `api_signup_confirm` | `api/signup/confirm` | `confirmSignup()` |
| `api_signup_load` | `api/signup/load` | `loadSignup()` |


### Tickets

**Total Endpoints:** 5

#### Tickets

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `tickets_main` | `tickets` | `mainPage()` |
| `tickets_show` | `tickets/show/:ticket_id:` | `mainPage()` |
| `tickets_ajax` | `tickets/ajax` | `ajaxTickets()` |
| `tickets_messages_ajax` | `tickets/:ticket_id:/messages` | `ajaxMessages()` |
| `tickets_subscription_ajax` | `tickets/:ticket_id:/subscription` | `ajaxSubscription()` |


### Translation

**Total Endpoints:** 1

#### Translations

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `translations_ajax` | `translations/ajax/:label:` | `ajaxTranslations()` |


### Wear

**Total Endpoints:** 19

#### Wear

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `wearhome` | `wear/` | `main()` |
| `show_wear` | `wear/showwear` | `showTypes()` |
| `show_wear_ajax` | `wear/showwear/ajax` | `showTypesAjax()` |
| `vis_wear` | `wear/viswear/:id:` | `showWear()` |
| `edit_wear` | `wear/editwear/:id:` | `editWear()` |
| `delete_wear` | `wear/deletewear/:id:` | `deleteWear()` |
| `create_wear` | `wear/createwear` | `createWear()` |
| `wear_attributes` | `wear/attributes` | `attributes()` |
| `wear_breakdown` | `wear/breakdown` | `wearBreakdown()` |
| `detailed_order_list` | `wear/detailed` | `detailedOrderList()` |
| `detailed_unfilled_order_list` | `wear/unfilled` | `detailedUnfilledOrderList()` |
| `detailed_ajax` | `wear/detailed/ajax/` | `detailedOrderAjax()` |
| `detailed_order_list_print` | `wear/detailed/print/` | `detailedOrderListPrint()` |
| `detailed_mini_list` | `wear/detailed/:id:` | `detailedMiniList()` |
| `ajax_get_wear` | `wear/ajaxgetwear/:id:` | `ajaxGetWear()` |
| `wear_handout` | `wear/handout` | `displayHandout()` |
| `wear_handout_ajax` | `wear/handout/ajax` | `ajaxHandout()` |
| `wear_labels` | `wear/print-labels` | `showPrintLabels()` |
| `wear_upload_image` | `wear/upload-image` | `uploadImage()` |


### index

**Total Endpoints:** 1

#### Index

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `cron_notifications` | `index/automaticmessages` | `sendAutomaticMessages()` |


### sms

**Total Endpoints:** 1

#### Sms

| Route Name | URL Pattern | Method |
|------------|-------------|--------|
| `sms_auto_dryrun` | `sms/auto-dryrun` | `autoDryRun()` |


## API Endpoints Detail

### RESTful API Endpoints

The system has a dedicated API controller (`ApiController`) that provides RESTful-style endpoints primarily for mobile app and external integrations.

#### Authentication & User Management
- `api/ribbon/login` - Ribbon system authentication
- `api/user/:id:` - Get user schedule data
- `api/v:version:/user/:id:` - Versioned user schedule endpoint
- `api/v2/user/:id:` - User schedule v2
- `api/v:version:/user-data/:email:` - Get user data by email (versioned)
- `api/v2/user-data/:email:` - User data v2
- `api/user/:id:/register` - Register app for push notifications
- `api/user/:id:/unregister` - Unregister app
- `api/request-password-email` - Request password reset

#### Activity & Schedule Data
- `api/activities` - List all activities
- `api/activities/:id:` - Get specific activity
- `api/activity-structure` - Get activity structure/metadata
- `api/schedule/:id:` - Get schedule/event instance
- `api/participantschedule/:id:` - Get participant's schedule

#### Resources (Food, Entrance, Wear, GDS)
- `api/food/:id:` - Food type data
- `api/entrance/:id:` - Entrance type data  
- `api/wear/:id:` - Wear/merchandise data
- `api/gdsshift/:id:` - GDS shift data

#### Participant Operations
- `api/participant/create` - Create new participant
- `api/participant/addwear` - Add wear item to participant
- `api/participant/addgds` - Add GDS shift to participant
- `api/participant/addactivity` - Add activity to participant
- `api/participant/addentrance` - Add entrance to participant
- `api/participant/signup` - Process signup

#### Messaging
- `api/messages/:id:` - Get user messages

#### Boardgames
- `api/v:version:/boardgames` - Get boardgame catalog
- `api/boardgameloans/:id:` - Get boardgame loans for user
- `api/boardgamerankings` - Get boardgame rankings

#### Data & Stats
- `api/graph/:name:` - Fetch graph/statistics data
- `api/v:version:/confirmation-data` - Get confirmation data

### Signup API

Separate signup system with dedicated API (`SignupApiController`):

- `api/signup/config/:module:` - Get signup configuration
- `api/signup/configlist` - List available configs
- `api/signup/pagelist` - List signup pages
- `api/signup/page/:page_id:` - Get specific page
- `api/signup/food` - Get food options
- `api/signup/activities` - Get activities for signup
- `api/signup/wear` - Get wear options
- `api/signup/submit` - Submit signup form
- `api/signup/confirm` - Confirm signup
- `api/signup/load` - Load existing signup

### AJAX Endpoints

Many controllers expose AJAX endpoints for dynamic frontend updates:

#### Participant AJAX
- `deltager/ajax/userlist` - User list data
- `deltager/ajaxsearch/:vagt_id:/:term:` - Search users
- `deltager/ajax/get_user_types` - Get user type options
- `deltager/payment/ajax` - Payment operations
- `deltager/checkin/ajax` - Check-in operations
- `deltager/ajax/editable/:id:` - In-place editing
- `deltager/ajax/parametersearch` - Advanced search
- `deltager/ajax/removeschedule` - Remove from schedule
- `deltager/ajax/updateschedule` - Update schedule
- `deltager/ajax/updateschedulepriorities` - Update priorities
- `participant/ajax/confirm-mobilepay` - Confirm mobile payment

#### Activity AJAX
- `aktivitet/ajax/:type:` - Various activity AJAX operations

#### GDS AJAX
- `gds/ajaxupdate` - Update GDS data
- `gds/ajaxsaveshift` - Save shift
- `gds/ajaxdeleteshift` - Delete shift
- `gds/ajaxcreateshift` - Create shift
- `gds/ajaxcreateblankshift` - Create blank shift
- `gds/ajaxshiftdetails` - Get shift details

#### Shop AJAX
- `shop/ajaxupdate` - Update shop product

#### Tickets AJAX
- `tickets/ajax` - Ticket operations
- `tickets/:ticket_id:/messages` - Ticket messages
- `tickets/:ticket_id:/subscription` - Manage subscription

#### Translation AJAX
- `translations/ajax/:label:` - Get/update translations

## HTTP Methods

The system primarily uses GET and POST methods routed through PHP's `$_GET`, `$_POST`, and `$_REQUEST` superglobals. The routing is based on URL patterns rather than HTTP verbs.

### Typical Request Flow

1. Request hits `public/index.php`
2. Bootstrap loads framework and config
3. Infosys object handles request via RequestHandler
4. Routes class matches URL to controller/method
5. Controller method executes
6. Response rendered (JSON, HTML template, or redirect)

## Authentication

Most endpoints require authentication via session. Exceptions include:
- Login/logout endpoints
- Password reset flows
- Some API endpoints using hash-based authentication
- Public signup pages

## Response Formats

- **HTML**: Most frontend endpoints return rendered HTML via templates
- **JSON**: API and AJAX endpoints return JSON (using `json_encode()`)
- **Redirects**: Many POST handlers redirect after processing
- **Downloads**: Some endpoints return files (Excel, PDF, barcodes)

## Migration Notes

### .NET Web API Mapping

When migrating to ASP.NET Core Web API:

1. **Route Patterns**: Convert `:param:` syntax to `{param}` route template syntax
2. **HTTP Verbs**: Explicitly use `[HttpGet]`, `[HttpPost]`, etc. attributes
3. **Controllers**: Create separate API controllers (inherit from `ControllerBase`)
4. **Authorization**: Implement `[Authorize]` attributes with policy-based auth
5. **DTOs**: Create data transfer objects for all API responses
6. **Versioning**: Implement proper API versioning for v2/v3 endpoints
7. **OpenAPI**: Add Swagger/OpenAPI documentation

### Recommended .NET Structure

```
/Controllers
  /Api
    - ActivitiesController.cs
    - ParticipantsController.cs
    - SchedulesController.cs
    - AuthController.cs
    - BoardgamesController.cs
    - SignupController.cs
  /Web (MVC for any server-rendered pages)
    - HomeController.cs
    - AccountController.cs
```

### Breaking Changes to Consider

- Move from session-based to JWT token-based auth for API
- Consistent RESTful naming (plural nouns: /api/participants vs /api/participant)
- Proper HTTP status codes (200, 201, 400, 401, 404, etc.)
- Standardized error responses
- CORS configuration for Angular frontend
- Rate limiting for public endpoints
