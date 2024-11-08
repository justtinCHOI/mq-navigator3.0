package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.ISetting;
import com.unitekndt.mqnavigator.entity.Member;

public interface SettingService {
    ISetting getSettingByWorkspaceUrlAndMember(String workspaceUrl, Member member);
    ISetting updateSettingByWorkspaceUrl(String workspaceUrl, Member member, ISetting newSetting);
}
